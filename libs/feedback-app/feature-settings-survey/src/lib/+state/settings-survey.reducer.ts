import { createReducer, on, Action } from '@ngrx/store';

import * as SettingsSurveyActions from './settings-survey.actions';
import {
  ErrorResponseDto,
  GetAllIdentifierDto,
  GetAllResponseDto,
  Survey,
} from '@nui/feedback-shared/core';

export const FEATURE_KEY = 'settingsSurvey';

export interface SettingsSurveyState {
  loadingSurvey: boolean;
  loadedSurvey?: Survey;
  loadSurveyError?: ErrorResponseDto;

  patchingSurvey: boolean;

  identifiersRes?: GetAllResponseDto<GetAllIdentifierDto>;
  loadingIdentifiers: boolean;
  identifiersError?: ErrorResponseDto;
  identifiersPage: number;
}

export const initialState: SettingsSurveyState = {
  loadingSurvey: false,

  patchingSurvey: false,

  loadingIdentifiers: false,
  identifiersPage:0
};

const featureReducer = createReducer(
  initialState,
  on(SettingsSurveyActions.nextIdentifiersPage, (state, action) => ({
    ...state,
    identifiersPage: state.identifiersPage + 1,
  })),
  on(SettingsSurveyActions.previousIdentifiersPage, (state, action) => ({
    ...state,
    identifiersPage: state.identifiersPage - 1,
  })),
  on(SettingsSurveyActions.loadIdentifiers, (state, action) => ({
    ...state,
    loadingIdentifiers: true,
  })),
  on(SettingsSurveyActions.loadIdentifiersSuccess, (state, action) => ({
    ...state,
    loadingIdentifiers: false,
    identifiersRes: action.res,
  })),
  on(SettingsSurveyActions.loadIdentifiersFailure, (state, action) => ({
    ...state,
    loadingIdentifiers: false,
    identifiersError: action.error,
  })),
  on(SettingsSurveyActions.loadSurvey, (state, action) => ({
    ...state,
    loadingSurvey: true,
  })),
  on(SettingsSurveyActions.loadSurveySuccess, (state, action) => ({
    ...state,
    loadingSurvey: false,
    loadedSurvey: action.res,
  })),
  on(SettingsSurveyActions.loadSurveyFailure, (state, action) => ({
    ...state,
    loadingSurvey: false,
    loadSurveyError: action.error,
  })),
  on(SettingsSurveyActions.resetState, (state, action) => ({
    ...initialState,
  })),
  on(SettingsSurveyActions.patchSurvey, (state, action) => ({
    ...state,
    patchingSurvey: true,
  })),
  on(SettingsSurveyActions.patchSurveySuccess, (state, action) => ({
    ...state,
    patchingSurvey: false,
    loadedSurvey: action.res,
  })),
  on(SettingsSurveyActions.patchSurveyFailure, (state, action) => ({
    ...state,
    patchingSurvey: false,
  }))
);

export function reducer(
  state: SettingsSurveyState | undefined,
  action: Action
) {
  return featureReducer(state, action);
}
