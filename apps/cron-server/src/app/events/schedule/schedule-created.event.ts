import { User } from "@nui/+auth/core";
import { Account, Schedule } from "@nui/cron-shared/core";

export class ScheduleCreatedEvent {
  public static event = 'schedule.created';
  constructor(public schedule: Schedule, public account: Account) {}
}
