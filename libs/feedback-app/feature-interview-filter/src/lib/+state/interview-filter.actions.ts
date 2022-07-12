import { createAction, props } from '@ngrx/store';
import {
  ErrorResponseDto,
  GetSurveyFilterDataDto,
} from '@nui/feedback-shared/core';

export enum InterviewFilterAction {
  RESET_STATE = '[feedback-app-feature-interview-filter] Reset state',

  LOAD_FILTER_DATA = '[feedback-app-feature-interview-filter] Load filter data',
  LOAD_FILTER_DATA_SUCCESS = '[feedback-app-feature-interview-filter] Loaded filter data successfully',
  LOAD_FILTER_DATA_FAILURE = '[feedback-app-feature-interview-filter] Failed to load filter data',

  REGISTER_FILTER_CHANGE = '[feedback-app-feature-interview-filter] Register filter change',

  APPLY_FILTER = '[feedback-app-feature-interview-filter] Apply filter',
  CLEAR_FILTER = '[feedback-app-feature-interview-filter] Clear filter',
}

export const resetState = createAction(InterviewFilterAction.RESET_STATE);

export const applyFilter = createAction(InterviewFilterAction.APPLY_FILTER);

export const clearFilter = createAction(InterviewFilterAction.CLEAR_FILTER);

export const registerFilterChange = createAction(
  InterviewFilterAction.REGISTER_FILTER_CHANGE,
  props<{ key: string; value: string; checked: boolean }>()
);

export const loadfilterData = createAction(
  InterviewFilterAction.LOAD_FILTER_DATA,
  props<{ surveyId?: string }>()
);

export const loadfilterDataSuccess = createAction(
  InterviewFilterAction.LOAD_FILTER_DATA_SUCCESS,
  props<{ res: GetSurveyFilterDataDto }>()
);

export const loadfilterDataFailure = createAction(
  InterviewFilterAction.LOAD_FILTER_DATA_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
