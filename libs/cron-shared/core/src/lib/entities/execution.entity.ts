import { Schedule, ScheduleHeader, ScheduleMethod } from './schedule.entity';

export enum ExecutionStatus {
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  ABORTED = 'ABORTED',
  FAILURE = 'FAILURE',
  ACCOUNT_LIMIT = 'ACCOUNT_LIMIT',
}

export interface Execution {
  id: string;

  schedule: Schedule;

  status: ExecutionStatus;

  url: string;

  method: ScheduleMethod;

  trigger?: Date;

  cronExpression?: string;

  timezone: string;

  headers: ScheduleHeader[];

  responseTime?: number;

  responseHeaders?: { [key: string]: string };

  responseStatus?: number;

  responseData?: string;

  payload: string;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}

export const isExecutionFailed = (execution: Execution): boolean => {
  return [
    ExecutionStatus.ABORTED,
    ExecutionStatus.FAILURE,
    ExecutionStatus.ACCOUNT_LIMIT,
  ].includes(execution.status);
};

export const isExecutionSuccessful = (execution: Execution): boolean => {
  return [ExecutionStatus.SUCCESS].includes(execution.status);
};
