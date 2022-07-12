import {  createAction, props } from '@ngrx/store';

import { ErrorResponseDto, SetupSurveyDto, Survey } from '@nui/feedback-shared/core';

export enum SetupSurveyAction {
  RESET_STATE = '[feedback-app-feature-setup-survey] Reset state',

  LOAD_SURVEY = '[feedback-app-feature-setup-survey] Load survey',
  LOAD_SURVEY_SUCCESS = '[feedback-app-feature-setup-survey] Loaded survey successfully',
  LOAD_SURVEY_FAILURE = '[feedback-app-feature-setup-survey] Failed to load survey',

  SETUP_SURVEY = '[feedback-app-feature-setup-survey] Setup survey',
  SETUP_SURVEY_SUCCESS = '[feedback-app-feature-setup-survey] Setup survey successfully',
  SETUP_SURVEY_FAILURE = '[feedback-app-feature-setup-survey] Failed to setup survey',
}

export const resetState = createAction(SetupSurveyAction.RESET_STATE);

export const loadSurvey = createAction(
  SetupSurveyAction.LOAD_SURVEY,
  props<{ surveyId: string }>()
);

export const loadSurveySuccess = createAction(
  SetupSurveyAction.LOAD_SURVEY_SUCCESS,
  props<{ res: Survey }>()
);

export const loadSurveyFailure = createAction(
  SetupSurveyAction.LOAD_SURVEY_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const setupSurvey = createAction(
  SetupSurveyAction.SETUP_SURVEY,
  props<{ setupDto: SetupSurveyDto }>()
);

export const setupSurveySuccess = createAction(
  SetupSurveyAction.SETUP_SURVEY_SUCCESS,
  props<{ res: Survey }>()
);

export const setupSurveyFailure = createAction(
  SetupSurveyAction.SETUP_SURVEY_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
