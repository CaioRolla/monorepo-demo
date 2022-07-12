import { createReducer, on, Action } from '@ngrx/store';
import { AccountStatsResponseDto } from '@nui/cron-shared/core';
import { ErrorResponseDto } from '@nui/shared/utils';

import * as HomeActions from './home.actions';

export const FEATURE_KEY = 'home';

export interface HomeState {
  stats?: AccountStatsResponseDto;
  loadingStats: boolean;
  loadStatsError?: ErrorResponseDto;

  schedulesPage: number;
}

export const initialState: HomeState = {
  loadingStats: false,
  schedulesPage: 0
};

const featureReducer = createReducer(
  initialState,
  on(HomeActions.nextSchedules, (state, action) => ({
    ...state,
    schedulesPage: state.schedulesPage + 1
  })),
  on(HomeActions.previousSchedules, (state, action) => ({
    ...state,
    schedulesPage: state.schedulesPage - 1
  })),
  on(HomeActions.loadStats, (state, action) => ({
    ...state,
    loadingStats: true
  })),
  on(HomeActions.loadStats, (state, action) => ({
    ...state,
    loadingStats: true
  })),
  on(HomeActions.loadStatsSuccess, (state, action) => ({
    ...state,
    loadingStats: false,
    stats: action.res
  })),
  on(HomeActions.loadStatsFailure, (state, action) => ({
    ...state,
    loadingStats: false,
    loadStatsError: action.error
  })),
  on(HomeActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: HomeState | undefined, action: Action) {
  return featureReducer(state, action);
}
