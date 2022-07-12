import { Account } from "@nui/cron-shared/core";

export class AccountUpgradedEvent {
  public static event = 'account.upgraded';
  constructor(public account: Account) {}
}
