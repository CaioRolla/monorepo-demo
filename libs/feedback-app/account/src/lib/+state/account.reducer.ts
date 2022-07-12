import { createReducer, on, Action } from '@ngrx/store';
import { Account, ErrorResponseDto } from '@nui/feedback-shared/core';

import * as AccountActions from './account.actions';

export const FEATURE_KEY = 'account';

export interface AccountState {

  loadingAccount: boolean;
  loadAccountError: ErrorResponseDto | null;
  account: Account | null;

  keepAccountUpdated: boolean;

}

export const initialState: AccountState = {
  loadingAccount: false,
  loadAccountError: null,
  account: null,

  keepAccountUpdated: false
};

const featureReducer = createReducer(
  initialState,
  on(AccountActions.loadAccount, (state, action) => ({
    ...state,
    loadingAccount: true
  })),
  on(AccountActions.loadAccountSuccess, (state, action) => ({
    ...state,
    loadingAccount: false,
    account: action.res
  })),
  on(AccountActions.loadAccountFailure, (state, action) => ({
    ...state,
    loadingAccount: false,
    loadAccountError: action.error
  })),
  on(AccountActions.clearAccount, (state, action) => ({
    ...state,
    account: null,
    loadAccountError: null
  })),
  on(AccountActions.keepAccountUpdated, (state, action) => ({
    ...state,
    keepAccountUpdated: true
  })),
  on(AccountActions.stopKeepingAccountUpdated, (state, action) => ({
    ...state,
    keepAccountUpdated: false
  })),
  on(AccountActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: AccountState | undefined, action: Action) {
  return featureReducer(state, action);
}
