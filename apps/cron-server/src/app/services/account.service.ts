import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as _ from 'lodash';

import { User } from '@nui/+auth/core';
import {
  Account,
  AccountPlan,
  AccountPlanType,
  AccountStatsResponseDto,
  AccountStatus,
  AccountUpgradeQueryDto,
  ExecutionStatus,
  getAllScheduleListFromScheduleList,
} from '@nui/cron-shared/core';
import { Stripe } from '@nui/shared-server/stripe';
import { AccountEntity } from '../entities/account.entity';
import { UserAccountEntity } from '../entities/user-account.entity';
import { AccountRepository } from '../repositories/account.repository';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { Logger } from '@nui/shared-server/logging';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ScheduleRepository } from '../repositories/schedule.repository';
import { UserRepository } from '@nui/+auth/server';
import { ExecutionRepository } from '../repositories/execution.repository';
import { In } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    private readonly _stripe: Stripe,
    private readonly _accountRepository: AccountRepository,
    private readonly _executionRepository: ExecutionRepository,
    private readonly _userAccountRepository: UserAccountRepository,
    private readonly _userRepository: UserRepository,
    private readonly _logger: Logger,
    private readonly _eventEmitter: EventEmitter2,
    private readonly _scheduleRepository: ScheduleRepository
  ) {}

  public async updateRapidAPIAccount(user: User, rapidAPIplan: string) {
    const userAccount =
      (await this._userAccountRepository.findOne({
        where: { user },
        relations: ['account'],
      })) || new UserAccountEntity();

    const account = userAccount?.account || new AccountEntity();

    if (!account.id) {
      account.status = AccountStatus.ACTIVE;
    }

    if (rapidAPIplan === 'PRO') {
      account.plan = AccountPlan.RAPID_API_PRO;
    } else {
      account.plan = AccountPlan.RAPID_API_FREE;
    }

    userAccount.user = user;
    userAccount.account = account;

    await this._userAccountRepository.save(userAccount);
  }

  public async getMy(user: User): Promise<Account> {
    const userAccount = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!userAccount) {
      const account = new AccountEntity();

      account.status = AccountStatus.ACTIVE;
      account.plan = AccountPlan.FREE;

      const userAccount = new UserAccountEntity();

      userAccount.user = user;
      userAccount.account = account;

      await this._userAccountRepository.save(userAccount);

      const savedUserAccount = await this._userAccountRepository.findOne({
        where: { user },
        relations: ['account'],
      });

      return savedUserAccount.account;
    }

    return userAccount.account;
  }

  public async getStats(user: User): Promise<AccountStatsResponseDto> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const schedules = await this._scheduleRepository.find({
      where: { account },
      order: { createdAt: 'DESC' },
    });

    const executionsCount = await this._executionRepository.count({
      where: { schedule: { id: In(schedules.map((s) => s.id)) } },
    });

    const failureExecutionsCount = schedules.reduce(
      (acc, prev) => acc + prev.stats.failedExecutions,
      0
    );
    const successExecutionsCount = schedules.reduce(
      (acc, prev) => acc + prev.stats.successfulExecutions,
      0
    );

    return {
      executionsCount,
      failureExecutionsCount,
      successExecutionsCount,
      schedules: getAllScheduleListFromScheduleList(schedules),
    };
  }

  public async upgrade(data: AccountUpgradeQueryDto): Promise<string> {
    const account = await this._accountRepository.findOne({
      where: { id: data.accountId },
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const session = await this._stripe.client.checkout.sessions.create({
      payment_method_types: ['card'],
      metadata: {
        accountId: data.accountId,
        plan: data.plan,
        planType: data.planType,
      },
      line_items: [
        {
          quantity: 1,
          price: this._getPlanPriceId(data.plan, data.planType),
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.APP_REDIRECT}/`,
      cancel_url: `${process.env.APP_REDIRECT}/`,
    });

    return session.url;
  }

  private _getPlanPriceId(plan: AccountPlan, type: AccountPlanType): string {
    return {
      [AccountPlan.DEVELOPER]: {
        [AccountPlanType.MONTHLY]:
          process.env.STRIPE_PRICE_ID_DEVELOPER_MONTHLY,
        [AccountPlanType.YEARLY]: process.env.STRIPE_PRICE_ID_DEVELOPER_YEARLY,
      },
      [AccountPlan.UNLIMITED]: {
        [AccountPlanType.MONTHLY]:
          process.env.STRIPE_PRICE_ID_UNLIMITED_MONTHLY,
        [AccountPlanType.YEARLY]: process.env.STRIPE_PRICE_ID_UNLIMITED_YEARLY,
      },
    }[plan][type];
  }

  public async getStripeCustomerPortalURL(
    user: User
  ): Promise<{ url: string }> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    if (!account.stripeCustomerId) {
      throw new NotFoundException(['Account customer ID not found.']);
    }

    const session = await this._stripe.client.billingPortal.sessions.create({
      customer: account.stripeCustomerId,
      return_url: `${process.env.APP_REDIRECT}/`,
    });

    return { url: session.url };
  }
}
