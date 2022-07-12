import { createReducer, on, Action } from '@ngrx/store';

import * as TermsActions from './terms.actions';

export const FEATURE_KEY = 'terms';

export interface TermsState {}

export const initialState: TermsState = {};

const featureReducer = createReducer(
  initialState,
  // on(TermsActions.action, (state, action) => ({
  //   ...state,
  //   deleteChannelLoading: true
  // })),
  on(TermsActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: TermsState | undefined, action: Action) {
  return featureReducer(state, action);
}
