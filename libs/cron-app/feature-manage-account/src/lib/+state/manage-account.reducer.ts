import { createReducer, on, Action } from '@ngrx/store';

import * as ManageAccountActions from './manage-account.actions';

export const FEATURE_KEY = 'manageAccount';

export interface ManageAccountState {}

export const initialState: ManageAccountState = {};

const featureReducer = createReducer(
  initialState,
  // on(ManageAccountActions.action, (state, action) => ({
  //   ...state,
  //   deleteChannelLoading: true
  // })),
  on(ManageAccountActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: ManageAccountState | undefined, action: Action) {
  return featureReducer(state, action);
}
