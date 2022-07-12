import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';

import { User } from '@nui/+auth/core';
import {
  Account,
  AccountPlan,
  AccountStatus,
  AccountUpgradeQueryDto,
  getQuestionByType,
  SurveyStatus,
  SurveyType,
} from '@nui/feedback-shared/core';
import { Stripe } from '@nui/shared-server/stripe';
import { AccountEntity } from '../entities/account.entity';
import { UserAccountEntity } from '../entities/user-account.entity';
import { AccountRepository } from '../repositories/account.repository';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { Logger } from '@nui/shared-server/logging';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRepository } from '@nui/+auth/server';
import { AccountCreatedEvent } from '../events/account/account-created.event';
import { SurveyEntity } from '../entities/survey.entity';
import { InterviewEntity } from '../entities/interview.entity';
import { SurveyRepository } from '../repositories/survey.repository';

@Injectable()
export class AccountService {
  constructor(
    private readonly _stripe: Stripe,
    private readonly _accountRepository: AccountRepository,
    private readonly _surveyRepository: SurveyRepository,
    private readonly _userAccountRepository: UserAccountRepository,
    private readonly _userRepository: UserRepository,
    private readonly _logger: Logger,
    private readonly _eventEmitter: EventEmitter2
  ) {}

  public async getMy(user: User): Promise<Account> {
    const userAccount = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!userAccount) {
      const account = new AccountEntity();

      account.status = AccountStatus.ACTIVE;
      account.plan = AccountPlan.UNSET;

      const userAccount = new UserAccountEntity();

      userAccount.user = user;
      userAccount.account = account;

      await this._userAccountRepository.save(userAccount);

      const savedUserAccount = await this._userAccountRepository.findOne({
        where: { user },
        relations: ['account'],
      });

      this._eventEmitter.emit(
        AccountCreatedEvent.event,
        new AccountCreatedEvent(savedUserAccount.account)
      );

      try {
        const survey = new SurveyEntity();
        survey.account = savedUserAccount.account;
        survey.name = 'Demo Survey';
        survey.desc = 'This is a demo survey.';
        survey.type = SurveyType.CSAT;
        survey.status = SurveyStatus.ACTIVE;
        survey.openQuestionEnabled = true;
        survey.primaryQuestionTitle = getQuestionByType(SurveyType.CSAT);

        const savedSurvey = await this._surveyRepository.save(survey);

        const interview01 = new InterviewEntity();
        interview01.survey = survey;
        interview01.primaryQuestionAnswer = 5;
        interview01.url = `https://app.surveyx.co/i/${savedSurvey.id}`;
        interview01.openQuestionAnswer =
          'Your newsletter is awesome. I also loved this feedback tool 😍';
        interview01.startedAt = new Date();
        interview01.finishedAt = new Date();

        const interview02 = new InterviewEntity();
        interview02.survey = survey;
        interview02.primaryQuestionAnswer = 3;
        interview02.url = `https://app.surveyx.co/i/${savedSurvey.id}`;
        interview02.openQuestionAnswer =
          'You need to publish more often, but your content is 10/10 🎉';
        interview02.startedAt = new Date();
        interview02.finishedAt = new Date();

        const interview03 = new InterviewEntity();
        interview03.survey = survey;
        interview03.primaryQuestionAnswer = 1;
        interview03.url = `https://app.surveyx.co/i/${savedSurvey.id}`;
        interview03.openQuestionAnswer = 'Why are you not publishing? 👎';
        interview03.startedAt = new Date();
        interview03.finishedAt = new Date();

        const interview04 = new InterviewEntity();
        interview04.survey = survey;
        interview04.primaryQuestionAnswer = 3;
        interview04.url = `https://app.surveyx.co/i/${savedSurvey.id}`;
        interview04.openQuestionAnswer = 'I miss your old editor. 😐';
        interview04.startedAt = new Date();
        interview04.finishedAt = new Date();

        const interview05 = new InterviewEntity();
        interview05.survey = survey;
        interview05.primaryQuestionAnswer = 5;
        interview05.url = `https://app.surveyx.co/i/${savedSurvey.id}`;
        interview05.openQuestionAnswer =
          'I love your new editor. Keep going! 💪';
        interview05.startedAt = new Date();
        interview05.finishedAt = new Date();

        const interview06 = new InterviewEntity();
        interview06.survey = survey;
        interview06.primaryQuestionAnswer = 5;
        interview06.url = `https://app.surveyx.co/i/${savedSurvey.id}`;
        interview06.openQuestionAnswer = 'I love you! 🥰';
        interview06.startedAt = new Date();
        interview06.finishedAt = new Date();

        savedSurvey.interviews = [
          interview01,
          interview02,
          interview03,
          interview04,
          interview05,
          interview06,
        ];

        await this._surveyRepository.save(savedSurvey);
      } catch (error) {
        this._logger.error('AccountService.getMy', error);
      }

      return savedUserAccount.account;
    }

    return userAccount.account;
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
      },
      line_items: [
        {
          quantity: 1,
          price: this._getPlanPriceId(data.plan),
        },
      ],
      ...(account.plan === AccountPlan.UNSET
        ? {
            subscription_data: {
              trial_end: Math.floor(+new Date() / 1000) + 15 * 24 * 60 * 60,
            },
          }
        : {}),
      mode: 'subscription',
      success_url: `${process.env.APP_REDIRECT}/`,
      cancel_url: `${process.env.APP_REDIRECT}/`,
    });

    return session.url;
  }

  private _getPlanPriceId(plan: AccountPlan): string {
    return {
      [AccountPlan.SCALE_MONTHLY]: process.env.STRIPE_PRICE_ID_SCALE_MONTHLY,
      [AccountPlan.SCALE_YEARLY]: process.env.STRIPE_PRICE_ID_SCALE_YEARLY,
      [AccountPlan.SCALE_LIFETIME]: process.env.STRIPE_PRICE_ID_SCALE_LIFETIME,
    }[plan];
  }
}
