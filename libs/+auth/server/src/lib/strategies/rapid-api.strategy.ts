import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { AuthServerService } from '../auth-server.service';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class RapidAPIStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'rapid-api'
) {
  constructor(_authServerService: AuthServerService) {
    super(
      {
        header: 'X-RapidAPI-Proxy-Secret',
        prefix: '',
        passReqToCallback: true,
      },
      true,
      async (apiKey, done, req: Request) => {
        if (apiKey !== process.env.RAPID_API_KEY) {
          done(new UnauthorizedException(), null);
          return;
        }

        const user = await _authServerService.validateUserByRapidAPI(
          req.header('X-RapidAPI-User')
        );
                
        if (user) {
          done(null, user);
          return;
        }

        done(new UnauthorizedException(), null);
        return;
      }
    );
  }
}
