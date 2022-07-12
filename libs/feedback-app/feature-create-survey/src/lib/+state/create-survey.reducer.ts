import { createReducer, on, Action } from '@ngrx/store';

import * as CreateSurveyActions from './create-survey.actions';

export const FEATURE_KEY = 'createSurvey';

export interface CreateSurveyState {
  creatingSurvey: boolean;
}

export const initialState: CreateSurveyState = {
  creatingSurvey: false
};

const featureReducer = createReducer(
  initialState,
  on(CreateSurveyActions.createSurvey, (state, action) => ({
    ...state,
    creatingSurvey: true
  })),
  on(CreateSurveyActions.createSurveySuccess, (state, action) => ({
    ...state,
    creatingSurvey: false
  })),
  on(CreateSurveyActions.createSurveyFailure, (state, action) => ({
    ...state,
    creatingSurvey: false
  })),
  on(CreateSurveyActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: CreateSurveyState | undefined, action: Action) {
  return featureReducer(state, action);
}
