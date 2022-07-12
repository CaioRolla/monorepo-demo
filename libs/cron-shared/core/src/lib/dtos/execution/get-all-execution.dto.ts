import { Execution, ExecutionStatus } from '../../entities/execution.entity';
import { ScheduleMethod } from '../../entities/schedule.entity';

export interface GetAllExecutionDto {
  id: string;

  status: ExecutionStatus;

  scheduleName: string;

  scheduleId: string;

  url: string;

  method: ScheduleMethod;

  trigger?: Date;

  cronExpression?: string;

  timezone: string;

  responseStatus?: number;

  responseTime?: number;

  createdAt: Date;
}

export const getAllExecutionFromExecution = (
  execution: Execution
): GetAllExecutionDto => {
  return {
    id: execution.id,
    scheduleName: execution.schedule.name,
    scheduleId: execution.schedule.id,
    status: execution.status,
    url: execution.url,
    method: execution.method,
    trigger: execution.trigger,
    cronExpression: execution.cronExpression,
    timezone: execution.timezone,
    responseStatus: execution.responseStatus,
    responseTime: execution.responseTime,
    createdAt: execution.createdAt,
  };
};

export const getAllExecutionListFromExecutionList = (
  schedules: Execution[]
): GetAllExecutionDto[] => {
  return schedules.map((sch) => getAllExecutionFromExecution(sch));
};
