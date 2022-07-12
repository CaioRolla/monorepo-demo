import { createReducer, on, Action } from '@ngrx/store';

import * as DeleteSurveyActions from './delete-survey.actions';

export const FEATURE_KEY = 'deleteSurvey';

export interface DeleteSurveyState {
  deletingSurvey: boolean;
}

export const initialState: DeleteSurveyState = {
  deletingSurvey: false
};

const featureReducer = createReducer(
  initialState,
  on(DeleteSurveyActions.deleteSurvey, (state, action) => ({
    ...state,
    deletingSurvey: true
  })),
  on(DeleteSurveyActions.deleteSurveySuccess, (state, action) => ({
    ...state,
    deletingSurvey: false
  })),
  on(DeleteSurveyActions.deleteSurveyFailure, (state, action) => ({
    ...state,
    deletingSurvey: false
  })),
  on(DeleteSurveyActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: DeleteSurveyState | undefined, action: Action) {
  return featureReducer(state, action);
}
