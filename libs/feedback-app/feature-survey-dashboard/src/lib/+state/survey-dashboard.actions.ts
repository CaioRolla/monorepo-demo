import { createAction, props } from '@ngrx/store';

import {
  ErrorResponseDto,
  GetAllInterviewFilterDto,
  SurveyStatsResponseDto,
} from '@nui/feedback-shared/core';

export enum SurveyDashboardAction {
  LOAD_STATS = '[feedback-app-feature-survey-dashboard] Load Stats',
  LOAD_STATS_SUCCESS = '[feedback-app-feature-survey-dashboard] Loaded Stats successfully',
  LOAD_STATS_FAILURE = '[feedback-app-feature-survey-dashboard] Failed to load Stats',

  RESET_STATE = '[feedback-app-feature-survey-dashboard] Reset state',

  APPLY_FILTER = '[feedback-app-feature-survey-dashboard] Apply filter',
}

export const applyFilter = createAction(
  SurveyDashboardAction.APPLY_FILTER,
  props<{ filter?: GetAllInterviewFilterDto }>()
);

export const loadStats = createAction(
  SurveyDashboardAction.LOAD_STATS,
  props<{ surveyId: string }>()
);

export const loadStatsSuccess = createAction(
  SurveyDashboardAction.LOAD_STATS_SUCCESS,
  props<{ res: SurveyStatsResponseDto }>()
);

export const loadStatsFailure = createAction(
  SurveyDashboardAction.LOAD_STATS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resetState = createAction(SurveyDashboardAction.RESET_STATE);
