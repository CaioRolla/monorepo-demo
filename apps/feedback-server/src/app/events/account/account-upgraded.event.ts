import { Account } from '@nui/feedback-shared/core';

export class AccountUpgradedEvent {
  public static event = 'account.upgraded';
  constructor(public account: Account) {}
}
