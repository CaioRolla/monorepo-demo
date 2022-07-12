import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthServerController } from './controllers/v1/auth-server.controller';
import { AuthServerService } from './auth-server.service';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import {
  UserRepository,
  UserRepositoryProvider,
} from './repositories/user.repository';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { UserListener } from './listeners/user.listener';
import { AuthServerConfig } from './auth-server.config';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { ApiKeyAuthGuard } from './guards/api-key-auth.guard';
import { JwtOrApiKeyAuthGuard } from './guards/jwt-or-api-key-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RapidAPIStrategy } from './strategies/rapid-api.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET || 'local',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthServerController],
  providers: [
    AuthServerService,
    ApiKeyStrategy,
    UserRepositoryProvider,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    GoogleStrategy,
    GoogleAuthGuard,
    UserListener,
    ApiKeyAuthGuard,
    JwtAuthGuard,
    JwtOrApiKeyAuthGuard,
    RapidAPIStrategy
  ],
  exports: [UserRepository],
})
export class AuthServerModule {
  static forRoot(config: AuthServerConfig): DynamicModule {
    return {
      module: AuthServerModule,
      providers: [
        {
          provide: AuthServerConfig,
          useValue: config,
        },
      ],
    };
  }
}
