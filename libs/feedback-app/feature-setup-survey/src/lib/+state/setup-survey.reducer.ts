import { createReducer, on, Action } from '@ngrx/store';

import * as SetupSurveyActions from './setup-survey.actions';
import { ErrorResponseDto, Survey } from '@nui/feedback-shared/core';

export const FEATURE_KEY = 'setupSurvey';

export interface SetupSurveyState {
  loadingSurvey: boolean;
  loadedSurvey?: Survey;
  loadSurveyError?: ErrorResponseDto;

  setuppingSurvey: boolean;
}

export const initialState: SetupSurveyState = {
  loadingSurvey: false,

  setuppingSurvey: false
};

const featureReducer = createReducer(
  initialState,
  on(SetupSurveyActions.setupSurvey, (state, action) => ({
    ...state,
    setuppingSurvey: true,
  })),
  on(SetupSurveyActions.setupSurveySuccess, (state, action) => ({
    ...state,
    setuppingSurvey: false,
  })),
  on(SetupSurveyActions.setupSurveyFailure, (state, action) => ({
    ...state,
    setuppingSurvey: false,
  })),
  on(SetupSurveyActions.loadSurvey, (state, action) => ({
    ...state,
    loadingSurvey: true,
  })),
  on(SetupSurveyActions.loadSurveySuccess, (state, action) => ({
    ...state,
    loadingSurvey: false,
    loadedSurvey: action.res,
  })),
  on(SetupSurveyActions.loadSurveyFailure, (state, action) => ({
    ...state,
    loadingSurvey: false,
    loadSurveyError: action.error,
  })),
  on(SetupSurveyActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: SetupSurveyState | undefined, action: Action) {
  return featureReducer(state, action);
}
