import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import {
  CheckoutSessionCompletedEvent,
  CustomerSubscriptionDeletedEvent,
  InvoicePaidEvent,
  Stripe,
  SubscriptionUpdatedEvent,
} from '@nui/shared-server/stripe';
import { StripeAccountUpdatedEvent } from '@nui/shared-server/stripe';
import { AccountRepository } from '../repositories/account.repository';
import { Logger } from '@nui/shared-server/logging';
import { AccountUpgradedEvent } from '../events/account/account-upgraded.event';
import { AccountPlan } from '@nui/cron-shared/core';

@Injectable()
export class StripeListener {
  constructor(
    private readonly _logger: Logger,
    private readonly _stripe: Stripe,
    private readonly _accountRepository: AccountRepository,
    private readonly _eventEmitter: EventEmitter2
  ) {}

  @OnEvent(CheckoutSessionCompletedEvent.event)
  public async handleCheckoutSessionCompletedEvent(
    event: StripeAccountUpdatedEvent
  ) {
    try {
      const { payload } = event;
      const data = payload.data.object as any;

      const { plan, accountId, planType } = data.metadata;
      const subscriptionId = data.subscription as string;
      const paymentStatus = data.payment_status as string;

      const account = await this._accountRepository.findOne({
        where: { id: accountId },
      });

      if (!account) {
        throw new Error(`Account ${accountId} not found`);
      }

      if (paymentStatus === 'paid' && subscriptionId) {
        account.plan = plan;
        account.planType = planType;
        account.stripeSubscriptionId = subscriptionId;
        account.stripeCustomerId = data.customer;

        const savedAccount = await this._accountRepository.save(account);

        this._eventEmitter.emit(
          AccountUpgradedEvent.event,
          new AccountUpgradedEvent(savedAccount)
        );
      }
    } catch (error) {
      this._logger.error(
        'StripeListener.handleCheckoutSessionCompletedEvent',
        error
      );
    }
  }

  @OnEvent(CustomerSubscriptionDeletedEvent.event)
  public async handleSCustomerSubscriptionDeletedEvent(
    event: CustomerSubscriptionDeletedEvent
  ) {
    try {
      const { payload } = event;
      const data = payload.data.object as any;

      const account = await this._accountRepository.findOne({
        where: { stripeCustomerId: data.customer },
      });

      if (!account) {
        throw new Error(`Account ${data.customer} not found`);
      }

      if (data.status === 'canceled') {
        account.plan = AccountPlan.FREE;

        await this._accountRepository.save(account);

        this._logger.log(`😡 A subscription was canceled: ${account.id}`);
      }
    } catch (error) {
      this._logger.error(
        'StripeListener.handleSCustomerSubscriptionDeletedEvent',
        error
      );
    }
  }
}
