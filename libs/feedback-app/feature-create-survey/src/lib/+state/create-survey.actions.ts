import {  createAction, props } from '@ngrx/store';

import {
  CreateSurveyDto,
  ErrorResponseDto,
  Survey,
} from '@nui/feedback-shared/core';

export enum CreateSurveyAction {
  RESET_STATE = '[feedback-app-feature-create-survey] Reset state',

  CREATE_SURVEY = '[feedback-app-feature-create-survey] Create Survey',
  CREATE_SURVEY_SUCCESS = '[feedback-app-feature-create-survey] Created Survey successfully',
  CREATE_SURVEY_FAILURE = '[feedback-app-feature-create-survey] Failed to create Survey',
}

export const resetState = createAction(CreateSurveyAction.RESET_STATE);

export const createSurvey = createAction(CreateSurveyAction.CREATE_SURVEY,
  props<{ createDto: CreateSurveyDto }>());

export const createSurveySuccess = createAction(
  CreateSurveyAction.CREATE_SURVEY_SUCCESS,
  props<{ res: Survey }>()
);

export const createSurveyFailure = createAction(
  CreateSurveyAction.CREATE_SURVEY_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
