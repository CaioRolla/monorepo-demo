import { Account } from './account.entity';
import { Execution, ExecutionStatus } from './execution.entity';

export enum ScheduleStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
}

export enum ScheduleType {
  ONE_TIME = 'ONE_TIME',
  RECURRING = 'RECURRING',
}

export enum ScheduleMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ScheduleResponseType {
  ARRAY_BUFFER = 'arraybuffer',
  BLOB = 'blob',
  DOCUMENT = 'document',
  JSON = 'json',
  TEXT = 'text',
  STREAM = 'stream',
}

export interface ScheduleHeader {
  key: string;
  value: string;
}

export interface ScheduleStats {
  failedExecutions: number;
  successfulExecutions: number;
  lastExecutionStatus: ExecutionStatus | null;
}

export interface Schedule {
  id: string;

  name: string;

  desc?: string;

  url: string;

  type: ScheduleType;

  method: ScheduleMethod;

  trigger?: Date;

  cronExpression?: string;

  notifyOnError: boolean;

  notifyEmail?: string;

  timezone: string;

  headers: ScheduleHeader[];

  responseType: ScheduleResponseType;

  payload: string;

  account: Account;

  executions: Execution[];

  status: ScheduleStatus;

  stats: ScheduleStats;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}

export const headersToKeyValue = (
  headers: ScheduleHeader[]
): { [key: string]: string } => {
  let obj = {};

  headers
    .filter((header) => !!header.value && !!header.key)
    .forEach((header) => {
      obj = {
        ...obj,
        [header.key]: header.value,
      };
    });

  return obj;
};
