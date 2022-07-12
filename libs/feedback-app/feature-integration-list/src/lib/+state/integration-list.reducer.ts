import { createReducer, on, Action } from '@ngrx/store';

import * as IntegrationListActions from './integration-list.actions';

export const FEATURE_KEY = 'integrationList';

export interface IntegrationListState {}

export const initialState: IntegrationListState = {};

const featureReducer = createReducer(
  initialState,
  // on(IntegrationListActions.action, (state, action) => ({
  //   ...state,
  //   deleteChannelLoading: true
  // })),
  on(IntegrationListActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(
  state: IntegrationListState | undefined,
  action: Action
) {
  return featureReducer(state, action);
}
