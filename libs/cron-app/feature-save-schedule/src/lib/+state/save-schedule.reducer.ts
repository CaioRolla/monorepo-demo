import { createReducer, on, Action } from '@ngrx/store';

import * as SaveScheduleActions from './save-schedule.actions';
import { Schedule } from '@nui/cron-shared/core';
import { ErrorResponseDto } from '@nui/shared/utils';

export const FEATURE_KEY = 'saveSchedule';

export interface SaveScheduleState {
  schedule?: Schedule;
  loadScheduleError?: ErrorResponseDto;
  loadingSchedule: boolean;

  savingSchedule: boolean;
  saveScheduleError?: ErrorResponseDto;
}

export const initialState: SaveScheduleState = {
  loadingSchedule: false,
  savingSchedule: false
};

const featureReducer = createReducer(
  initialState,

  on(SaveScheduleActions.loadSchedule, (state, action) => ({
    ...state,
    loadingSchedule: true
  })),

  on(SaveScheduleActions.loadScheduleSuccess, (state, action) => ({
    ...state,
    loadingSchedule: false,
    schedule: action.schedule
  })),

  on(SaveScheduleActions.loadScheduleFailure, (state, action) => ({
    ...state,
    loadingSchedule: false,
    loadScheduleError: action.error
  })),

  on(SaveScheduleActions.createSchedule, (state, action) => ({
    ...state,
    savingSchedule: true
  })),
  
  on(SaveScheduleActions.patchSchedule, (state, action) => ({
    ...state,
    savingSchedule: true
  })),  

  on(SaveScheduleActions.saveScheduleSuccess, (state, action) => ({
    ...state,
    savingSchedule: false
  })),

  on(SaveScheduleActions.saveScheduleFailure, (state, action) => ({
    ...state,
    savingSchedule: false,
    saveScheduleError: action.error
  })),

  on(SaveScheduleActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: SaveScheduleState | undefined, action: Action) {
  return featureReducer(state, action);
}
