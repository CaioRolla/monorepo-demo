import {  createAction, props } from '@ngrx/store';

import {
  Account,
  CreateSurveyDto,
  errorHandler,
  ErrorResponseDto,
  fetchDataHandler,
  GetAllQueryDto,
  GetAllResponseDto,
  GetAllSurveyDto,
  PatchSurveyDto,
  requestHandler,
  SetupSurveyDto,
  Survey,
} from '@nui/feedback-shared/core';

export enum HomeAction {
  RESET_STATE = '[feedback-app-feature-home] Reset state',

  LOAD_SURVEYS = '[feedback-app-feature-home] Load surveys',
  LOAD_SURVEYS_SUCCESS = '[feedback-app-feature-home] Loaded surveys successfully',
  LOAD_SURVEYS_FAILURE = '[feedback-app-feature-home] Failed to load surveys',

  NEXT_SURVEYS_PAGE = `[feedback-app-feature-home] Next surveys page`,
  PREVIOUS_SURVEYS_PAGE = `[feedback-app-feature-home] Previous surveys page`,
}

export const resetState = createAction(HomeAction.RESET_STATE);

export const nextSurveysPage = createAction(HomeAction.NEXT_SURVEYS_PAGE);

export const previousSurveysPage = createAction(HomeAction.PREVIOUS_SURVEYS_PAGE);

export const loadSurveys = createAction(HomeAction.LOAD_SURVEYS);

export const loadSurveysSuccess = createAction(
  HomeAction.LOAD_SURVEYS_SUCCESS,
  props<{ res: GetAllResponseDto<GetAllSurveyDto> }>()
);

export const loadSurveysFailure = createAction(
  HomeAction.LOAD_SURVEYS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
