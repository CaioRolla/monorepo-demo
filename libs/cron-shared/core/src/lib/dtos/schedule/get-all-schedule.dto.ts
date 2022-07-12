import * as _ from 'lodash';
import { ExecutionStatus } from '../../entities/execution.entity';

import { Schedule, ScheduleStatus } from '../../entities/schedule.entity';

export interface GetAllScheduleDto {
  id: string;

  status: ScheduleStatus;

  name: string;

  lastExecutionStatus: ExecutionStatus | null;

  desc?: string;

  createdAt: Date;
}

export const getAllScheduleFromSchedule = (
  schedule: Schedule
): GetAllScheduleDto => {
  return {
    id: schedule.id,
    name: schedule.name,
    desc: schedule.desc,
    status: schedule.status,
    lastExecutionStatus: schedule.stats.lastExecutionStatus,
    createdAt: schedule.createdAt,
  };
};

export const getAllScheduleListFromScheduleList = (
  schedules: Schedule[]
): GetAllScheduleDto[] => {
  return schedules.map((sch) => getAllScheduleFromSchedule(sch));
};
