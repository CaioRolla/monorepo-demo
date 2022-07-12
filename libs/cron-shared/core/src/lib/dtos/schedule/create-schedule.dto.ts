import { ScheduleHeader, ScheduleMethod, ScheduleResponseType, ScheduleType } from '../../entities/schedule.entity';

export interface CreateScheduleDto {
  name: string;

  desc?: string;

  url: string;

  type: ScheduleType;

  method: ScheduleMethod;

  trigger?: Date;

  cronExpression?: string;

  notifyOnError: boolean;

  notifyEmail?: string;

  timezone?: string;

  responseType?: ScheduleResponseType;

  headers: ScheduleHeader[];

  payload: string;
}
