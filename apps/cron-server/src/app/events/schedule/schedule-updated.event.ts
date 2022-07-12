import { Account, Schedule } from '@nui/cron-shared/core';

export class ScheduleUpdatedEvent {
  public static event = 'schedule.updated';
  constructor(public schedule: Schedule, public account: Account) {}
}
