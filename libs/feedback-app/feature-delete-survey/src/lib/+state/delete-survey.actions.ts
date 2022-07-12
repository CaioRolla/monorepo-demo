import {  createAction, props } from '@ngrx/store';

import { ErrorResponseDto } from '@nui/feedback-shared/core';

export enum DeleteSurveyAction {
  RESET_STATE = '[feedback-app-feature-delete-survey] Reset state',

  DELETE_SURVEY = '[feedback-app-feature-delete-survey] Delete survey',
  DELETE_SURVEY_SUCCESS = '[feedback-app-feature-delete-survey] Deleted survey successfully',
  DELETE_SURVEY_FAILURE = '[feedback-app-feature-delete-survey] Failed to delete survey',
}

export const deleteSurvey = createAction(
  DeleteSurveyAction.DELETE_SURVEY,
  props<{ surveyId: string }>()
);

export const deleteSurveySuccess = createAction(
  DeleteSurveyAction.DELETE_SURVEY_SUCCESS,
);

export const deleteSurveyFailure = createAction(
  DeleteSurveyAction.DELETE_SURVEY_SUCCESS,
  props<{ error: ErrorResponseDto }>()
);

export const resetState = createAction(DeleteSurveyAction.RESET_STATE);
