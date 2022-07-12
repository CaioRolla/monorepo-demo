import {  createAction, props } from '@ngrx/store';

export enum LoginMerchAction {
  RESET_STATE = '[feedback-app-feature-login-merch] Reset state',
}

export const resetState = createAction(LoginMerchAction.RESET_STATE);
