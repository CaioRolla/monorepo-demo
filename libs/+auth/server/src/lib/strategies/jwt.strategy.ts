import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { UserStatus } from '@nui/+auth/core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.AUTH_JWT_SECRET || 'local',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {

    if (!payload.ref && req.headers.ref) {

      payload.ref = req.headers.ref;

      const user = await this._userRepository.findOne({ id: payload.id });
      
      user.ref = req.headers.ref as string;

      await this._userRepository.save(user);
    }

    if(payload.status === UserStatus.PENDING_CONFIRMATION){
      throw new UnauthorizedException(['Email not confirmed']);
    }


    return { ...payload, iat: undefined, exp: undefined };
  }
}
