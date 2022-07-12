import {  createAction, props } from '@ngrx/store';
import { AccountStatsResponseDto } from '@nui/cron-shared/core';
import { ErrorResponseDto } from '@nui/shared/utils';

export enum HomeAction {
  RESET_STATE = '[cron-app-feature-home] Reset state',

  LOAD_STATS = '[cron-app-feature-home] Load stats',
  LOAD_STATS_SUCCESS = '[cron-app-feature-home] Loaded status',
  LOAD_STATS_FAILURE = '[cron-app-feature-home] Failed to load status',

  NEXT_SCHEDULES = '[cron-app-feature-home] Next schedules table ',
  PREVIOUS_SCHEDULES = '[cron-app-feature-home] Previous schedules table page',
}

export const resetState = createAction(HomeAction.RESET_STATE);

export const nextSchedules = createAction(HomeAction.NEXT_SCHEDULES);

export const previousSchedules = createAction(HomeAction.PREVIOUS_SCHEDULES);

export const loadStats = createAction(HomeAction.LOAD_STATS);

export const loadStatsSuccess = createAction(
  HomeAction.LOAD_STATS_SUCCESS,
  props<{ res: AccountStatsResponseDto }>()
);

export const loadStatsFailure = createAction(
  HomeAction.LOAD_STATS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
