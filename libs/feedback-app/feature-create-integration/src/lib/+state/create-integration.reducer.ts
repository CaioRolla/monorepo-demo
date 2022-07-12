import { createReducer, on, Action } from '@ngrx/store';

import * as CreateIntegrationActions from './create-integration.actions';

export const FEATURE_KEY = 'createIntegration';

export interface CreateIntegrationState {
  creatingIntegration: boolean;
}

export const initialState: CreateIntegrationState = {
  creatingIntegration: false
};

const featureReducer = createReducer(
  initialState,
  on(CreateIntegrationActions.createIntegration, (state, action) => ({
    ...state,
    creatingIntegration: true
  })),
  on(CreateIntegrationActions.createIntegrationSuccess, (state, action) => ({
    ...state,
    creatingIntegration: false
  })),
  on(CreateIntegrationActions.createIntegrationFailure, (state, action) => ({
    ...state,
    creatingIntegration: false
  })),
  on(CreateIntegrationActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(
  state: CreateIntegrationState | undefined,
  action: Action
) {
  return featureReducer(state, action);
}
