import { ScheduleHeader, ScheduleMethod, ScheduleResponseType, ScheduleStatus, ScheduleType } from "../../entities/schedule.entity";

export interface PatchScheduleDto {
  id: string;

  name?: string;

  desc?: string;

  status?: ScheduleStatus;

  url?: string;

  type?: ScheduleType;

  method?: ScheduleMethod;

  trigger?: Date;

  cronExpression?: string;

  notifyOnError?: boolean;

  notifyEmail?: string;

  timezone?: string;

  headers?: ScheduleHeader[];

  responseType?: ScheduleResponseType;

  payload?: string;
}
