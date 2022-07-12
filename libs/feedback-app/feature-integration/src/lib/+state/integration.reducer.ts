import { createReducer, on, Action } from '@ngrx/store';

import * as IntegrationActions from './integration.actions';

export const FEATURE_KEY = 'integration';

export interface IntegrationState {}

export const initialState: IntegrationState = {};

const featureReducer = createReducer(
  initialState,
  // on(IntegrationActions.action, (state, action) => ({
  //   ...state,
  //   deleteChannelLoading: true
  // })),
  on(IntegrationActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: IntegrationState | undefined, action: Action) {
  return featureReducer(state, action);
}
