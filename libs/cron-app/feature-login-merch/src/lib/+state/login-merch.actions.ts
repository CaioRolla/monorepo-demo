import {  createAction, props } from '@ngrx/store';

export enum LoginMerchAction {
  RESET_STATE = '[cron-app-feature-login-merch] Reset state',
}

export const resetState = createAction(LoginMerchAction.RESET_STATE);
