import { createReducer, on, Action } from '@ngrx/store';

import * as LoginMerchActions from './login-merch.actions';

export const FEATURE_KEY = 'loginMerch';

export interface LoginMerchState {}

export const initialState: LoginMerchState = {};

const featureReducer = createReducer(
  initialState,
  // on(LoginMerchActions.action, (state, action) => ({
  //   ...state,
  //   deleteChannelLoading: true
  // })),
  on(LoginMerchActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: LoginMerchState | undefined, action: Action) {
  return featureReducer(state, action);
}
