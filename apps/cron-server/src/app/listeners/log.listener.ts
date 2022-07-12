import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { Logger } from '@nui/shared-server/logging';
import { UserCreatedEvent } from '@nui/+auth/server';
import { ScheduleCreatedEvent } from '../events/schedule/schedule-created.event';
import { AccountUpgradedEvent } from '../events/account/account-upgraded.event';

@Injectable()
export class LogListener {
  constructor(private readonly _logger: Logger) {}

  @OnEvent(UserCreatedEvent.event)
  public async handleUserCreatedEvent(payload: UserCreatedEvent) {
    this._logger.log(`😊 A new user was created: ${payload.user.displayName}`);
  }

  @OnEvent(ScheduleCreatedEvent.event)
  public async handleScheduleCreatedEvent(payload: ScheduleCreatedEvent) {
    this._logger.log(`😊 A new Schedule was created: ${payload.schedule.id} || ${payload.schedule.name}`);
  }

  @OnEvent(AccountUpgradedEvent.event)
  public async handleAccountUpgradedEvent(payload: AccountUpgradedEvent) {
    this._logger.log(`💸 A account was Upgraded: ${payload.account.id} || ${payload.account.name}`);
  }
}


