import {  createAction, props } from '@ngrx/store';

import { ErrorResponseDto } from '@nui/shared/utils';
import { CreateScheduleDto, PatchScheduleDto, Schedule } from '@nui/cron-shared/core';

export enum SaveScheduleAction {
  RESET_STATE = '[cron-app-feature-save-schedule] Reset state',

  LOAD_SCHEDULE = '[cron-app-feature-save-schedule] Load Schedule',
  LOAD_SCHEDULE_SUCCESS = '[cron-app-feature-save-schedule] Loaded Schedule successfully',
  LOAD_SCHEDULE_FAILURE = '[cron-app-feature-save-schedule] Failed to load schedule',

  CREATE_SCHEDULE = '[cron-app-feature-save-schedule] Create Schedule',
  PATCH_SCHEDULE = '[cron-app-feature-save-schedule] Patch Schedule',
  SAVE_SCHEDULE_SUCCESS = '[cron-app-feature-save-schedule] Saved Schedule successfully',
  SAVE_SCHEDULE_FAILURE = '[cron-app-feature-save-schedule] Failed to save schedule',
}

export const resetState = createAction(SaveScheduleAction.RESET_STATE);

export const loadSchedule = createAction(
  SaveScheduleAction.LOAD_SCHEDULE,
  props<{ scheduleId: string }>()
);

export const loadScheduleSuccess = createAction(
  SaveScheduleAction.LOAD_SCHEDULE_SUCCESS,
  props<{ schedule: Schedule }>()
);

export const loadScheduleFailure = createAction(
  SaveScheduleAction.LOAD_SCHEDULE_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const createSchedule = createAction(
  SaveScheduleAction.CREATE_SCHEDULE,
  props<{ saveDto: CreateScheduleDto }>()
);

export const patchSchedule = createAction(
  SaveScheduleAction.PATCH_SCHEDULE,
  props<{ saveDto: PatchScheduleDto }>()
);

export const saveScheduleSuccess = createAction(
  SaveScheduleAction.SAVE_SCHEDULE_SUCCESS,
  props<{ schedule: Schedule }>()
);

export const saveScheduleFailure = createAction(
  SaveScheduleAction.SAVE_SCHEDULE_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
