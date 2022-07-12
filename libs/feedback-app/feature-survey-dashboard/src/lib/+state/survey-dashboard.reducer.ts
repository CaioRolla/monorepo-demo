import { createReducer, on, Action } from '@ngrx/store';

import {
  ErrorResponseDto,
  GetAllInterviewFilterDto,
  SurveyStatsResponseDto,
} from '@nui/feedback-shared/core';
import * as SurveyDashboardActions from './survey-dashboard.actions';

export const FEATURE_KEY = 'surveyDashboard';

export interface SurveyDashboardState {
  surveyId?: string;
  stats?: SurveyStatsResponseDto;
  statsError?: ErrorResponseDto;
  loadingStats: boolean;

  appliedFilter?: GetAllInterviewFilterDto;
}

export const initialState: SurveyDashboardState = {
  loadingStats: false,
};

const featureReducer = createReducer(
  initialState,
  on(SurveyDashboardActions.applyFilter, (state, action) => ({
    ...state,
    appliedFilter: action.filter,
    loadingStats: true
  })),
  on(SurveyDashboardActions.loadStats, (state, action) => ({
    ...state,
    loadingStats: true,
    surveyId: action.surveyId,
  })),
  on(SurveyDashboardActions.loadStatsSuccess, (state, action) => ({
    ...state,
    loadingStats: false,
    stats: action.res,
  })),
  on(SurveyDashboardActions.loadStatsFailure, (state, action) => ({
    ...state,
    loadingStats: false,
    statsError: action.error,
  })),
  on(SurveyDashboardActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(
  state: SurveyDashboardState | undefined,
  action: Action
) {
  return featureReducer(state, action);
}
