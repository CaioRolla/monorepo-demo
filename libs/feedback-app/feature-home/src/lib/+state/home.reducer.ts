import { createReducer, on, Action } from '@ngrx/store';
import {
  ErrorResponseDto,
  GetAllResponseDto,
  GetAllSurveyDto,
} from '@nui/feedback-shared/core';

import * as HomeActions from './home.actions';

export const FEATURE_KEY = 'home';

export interface HomeState {
  surveysRes?: GetAllResponseDto<GetAllSurveyDto>;
  surveysError?: ErrorResponseDto;
  loadingSurveys: boolean;
  surveysPage: number;
}

export const initialState: HomeState = {
  loadingSurveys: false,
  surveysPage: 0
};

const featureReducer = createReducer(
  initialState,
  on(HomeActions.nextSurveysPage, (state, action) => ({
    ...state,
    surveysPage: state.surveysPage + 1,
  })),
  on(HomeActions.previousSurveysPage, (state, action) => ({
    ...state,
    surveysPage: state.surveysPage - 1,
  })),
  on(HomeActions.loadSurveys, (state, action) => ({
    ...state,
    loadingSurveys: true,
  })),
  on(HomeActions.loadSurveysSuccess, (state, action) => ({
    ...state,
    loadingSurveys: false,
    surveysRes: action.res,
  })),
  on(HomeActions.loadSurveysFailure, (state, action) => ({
    ...state,
    loadingSurveys: false,
    surveysError: action.error,
  })),
  on(HomeActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: HomeState | undefined, action: Action) {
  return featureReducer(state, action);
}
