import { GetAllScheduleDto } from "../schedule/get-all-schedule.dto";

export interface AccountStatsResponseDto {
  executionsCount: number;
  failureExecutionsCount: number;
  successExecutionsCount: number;
  schedules: GetAllScheduleDto[];
}
