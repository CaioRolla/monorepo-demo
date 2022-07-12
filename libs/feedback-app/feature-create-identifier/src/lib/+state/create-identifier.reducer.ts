import { createReducer, on, Action } from '@ngrx/store';
import { Identifier } from '@nui/feedback-shared/core';

import * as CreateIdentifierActions from './create-identifier.actions';

export const FEATURE_KEY = 'createIdentifier';

export interface CreateIdentifierState {
  creatingIdentifier: boolean;
  identifier?: Identifier;
}

export const initialState: CreateIdentifierState = {
  creatingIdentifier: false,
};

const featureReducer = createReducer(
  initialState,
  on(CreateIdentifierActions.createIdentifier, (state, action) => ({
    ...state,
    creatingIdentifier: true,
  })),
  on(CreateIdentifierActions.createIdentifierSuccess, (state, action) => ({
    ...state,
    creatingIdentifier: false,
    identifier: action.res,
  })),
  on(CreateIdentifierActions.createIdentifierFailure, (state, action) => ({
    ...state,
    creatingIdentifier: false,
  })),
  on(CreateIdentifierActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(
  state: CreateIdentifierState | undefined,
  action: Action
) {
  return featureReducer(state, action);
}
