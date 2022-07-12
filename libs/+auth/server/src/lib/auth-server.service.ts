import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuid4 } from 'uuid';
const human = require('humanparser');

import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import {
  JwtTokenDto,
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResendRegisterConfirmationDto,
  User,
  UserStatus,
  ResetPasswordDto,
} from '@nui/+auth/core';
import { UserCreatedEvent } from './events/user-created.event';
import { AuthServerConfig } from './auth-server.config';
import { join } from 'path';

@Injectable()
export class AuthServerService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userRepository: UserRepository,
    private readonly _eventEmitter: EventEmitter2,
    private readonly _config: AuthServerConfig,
    private readonly _mailerService: MailerService
  ) {}

  public async confirmRegistration(
    confirmationToken: string
  ): Promise<JwtTokenDto> {
    const user = await this._userRepository.findOne({
      where: { confirmationToken },
    });

    if (!user) {
      throw new NotFoundException(['Your confirmation token is not valid.']);
    }

    user.confirmationToken = null;
    user.status = UserStatus.ACTIVE;

    const savedUsed = await this._userRepository.save(user);

    return {
      accessToken: await this._jwtService.sign({
        ...savedUsed,
        password: undefined,
      }),
    };
  }

  public async resetPassword(
    resendDto: ResetPasswordDto
  ): Promise<JwtTokenDto> {
    const user = await this._userRepository.findOne({
      where: { confirmationToken: resendDto.confirmationToken },
    });

    if (!user) {
      return;
    }

    user.password = await bcrypt.hash(resendDto.password, 5);
    user.confirmationToken = null;

    await this._userRepository.save(user);

    const validatedUser = await this.validateUser(
      user.email,
      resendDto.password
    );

    return {
      accessToken: await this._jwtService.sign({
        ...validatedUser,
        password: undefined,
      }),
    };
  }

  public async forgotPassword(resendDto: ForgotPasswordDto): Promise<void> {
    const user = await this._userRepository.findOne({
      where: { email: resendDto.email },
    });

    if (!user) {
      return;
    }

    user.confirmationToken = uuid4();

    await this._userRepository.save(user);

    await this._mailerService.sendMail({
      to: user.email,
      subject: `Reset your password 👍`,
      template: join(
        __dirname,
        'email-templates',
        'forgot-password-confirmation'
      ),
      context: {
        app: {
          logo: this._config.appLogo,
          name: this._config.appName,
          host: this._config.appHost,
        },
        user,
        confirmationUrl: `${this._config.appBasePath}/auth/reset-password/${user.confirmationToken}`,
      },
    });
  }

  public async resendRegisterConfirmation(
    resendDto: ResendRegisterConfirmationDto
  ): Promise<void> {
    const user = await this._userRepository.findOne({
      where: { email: resendDto.email },
    });

    if (!user) {
      return;
    }

    await this._mailerService.sendMail({
      to: user.email,
      subject: `Confirm your email 🎉`,
      template: join(__dirname, 'email-templates', 'register-confirmation'),
      context: {
        app: {
          logo: this._config.appLogo,
          name: this._config.appName,
          host: this._config.appHost,
        },
        user,
        confirmationUrl: `${this._config.baseApi}/v1/auth/confirm-registration/${user.confirmationToken}`,
      },
    });
  }

  public async register(registerDto: RegisterDto): Promise<void> {
    const user = await this._userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (user) {
      throw new ConflictException(['You already have an account.']);
    }

    const name = human.parseName(registerDto.name);

    const newUser = new UserEntity();
    newUser.displayName = name?.firstName || registerDto.name;
    newUser.permissions = this._config.userDefaultPermissions;
    newUser.email = registerDto.email;
    newUser.confirmationToken = uuid4();
    newUser.status = UserStatus.PENDING_CONFIRMATION;
    newUser.password = await bcrypt.hash(registerDto.password, 5);

    const savedUser = await this._userRepository.save(newUser);

    await this._mailerService.sendMail({
      to: savedUser.email,
      subject: `Confirm ${this._config.appName} registration 🎉`,
      template: join(__dirname, 'email-templates', 'register-confirmation'),
      context: {
        app: {
          logo: this._config.appLogo,
          name: this._config.appName,
          host: this._config.appHost,
        },
        user: savedUser,
        confirmationUrl: `${this._config.baseApi}/v1/auth/confirm-registration/${savedUser.confirmationToken}`,
      },
    });

    this._eventEmitter.emit(
      UserCreatedEvent.event,
      new UserCreatedEvent(savedUser)
    );
  }

  public async login(loginDto: LoginDto): Promise<JwtTokenDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    return {
      accessToken: await this._jwtService.sign({
        ...user,
        password: undefined,
      }),
    };
  }

  public async googleLogin(user: User): Promise<JwtTokenDto> {
    return {
      accessToken: await this._jwtService.sign({
        ...user,
        password: undefined,
      }),
    };
  }

  public async validateGoogleUser(
    profile: any,
    accessToken: string,
    refreshToken: string
  ) {
    const { displayName, name, emails, photos } = profile;

    const user = await this._userRepository.findOne({
      where: { email: emails[0].value },
    });

    if (!user) {
      const newUser = new UserEntity();

      newUser.email = emails[0].value;
      newUser.displayName = displayName;
      newUser.accessToken = accessToken;
      newUser.refreshToken = refreshToken;
      newUser.givenName = name.givenName;
      newUser.familyName = name.familyName;
      newUser.permissions = this._config.userDefaultPermissions;
      newUser.profilePicUrl = photos[0]?.value;
      newUser.status = UserStatus.ACTIVE;

      const savedUser = await this._userRepository.save(newUser);

      this._eventEmitter.emit(
        UserCreatedEvent.event,
        new UserCreatedEvent(savedUser)
      );

      return { ...savedUser };
    }

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.password = null;

    await this._userRepository.save(user);

    return { ...user };
  }

  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this._userRepository.findOne({
      where: { email },
      select: ['email', 'password', 'status'],
    });

    if (user.status === UserStatus.PENDING_CONFIRMATION) {
      throw new UnauthorizedException(['Email not confirmed']);
    }

    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new UnauthorizedException(['Invalid email and/or password']);
    }

    const returnedUser = await this._userRepository.findOne({
      where: { email },
    });

    return { ...returnedUser };
  }

  public async validateUserByApiKey(apiKey: string): Promise<User> {
    const user = await this._userRepository.findOne({ where: { apiKey } });

    if (!user || apiKey !== user.apiKey) {
      throw new UnauthorizedException(['Invalid API key']);
    }

    const returnedUser = await this._userRepository.findOne({
      where: { apiKey },
    });

    return { ...returnedUser };
  }

  public async validateUserByRapidAPI(rapidAPIusername: string): Promise<User> {
    const user = await this._userRepository.findOne({
      where: { rapidAPIusername },
    });

    if (!user) {
      const newUser = new UserEntity();

      newUser.displayName = rapidAPIusername;
      newUser.rapidAPIusername = rapidAPIusername;
      newUser.permissions = this._config.userDefaultPermissions;
      newUser.isRapidAPIuser = true;
      newUser.status = UserStatus.ACTIVE;

      await this._userRepository.save(newUser);

      const savedUser = await this._userRepository.findOne({
        where: { rapidAPIusername },
      });

      this._eventEmitter.emit(
        UserCreatedEvent.event,
        new UserCreatedEvent(savedUser)
      );

      return { ...savedUser };
    }

    return { ...user };
  }
}
