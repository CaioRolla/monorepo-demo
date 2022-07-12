import { Account } from '@nui/feedback-shared/core';

export class AccountCreatedEvent {
  public static event = 'account.created';
  constructor(public account: Account) {}
}
