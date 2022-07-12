import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { AccountService } from '../services/account.service';

@Injectable()
export class RapidAPIAccountInterceptor implements NestInterceptor {
  constructor(
    private readonly _userAccountRepository: UserAccountRepository,
    private readonly _accountService: AccountService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    if (!request.user?.isRapidAPIuser) {
      return next.handle();
    }

    if (
      request.header('X-RapidAPI-Proxy-Secret') === process.env.RAPID_API_KEY
    ) {
      await this._accountService.updateRapidAPIAccount(
        request.user,
        request.headers['X-RapidAPI-Subscription']
      );

      return next.handle();
    }

    return next.handle();
  }
}
