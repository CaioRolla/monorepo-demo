import { Execution, Schedule } from '@nui/cron-shared/core';

export class ExecutionCreatedEvent {
  public static event = 'execution.created';
  constructor(public execution: Execution, public schedule: Schedule) {}

}
