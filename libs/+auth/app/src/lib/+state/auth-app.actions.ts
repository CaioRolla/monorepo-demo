import {  createAction, props } from '@ngrx/store';

export enum AuthAppAction {
  SET_TOKEN = '[auth-app] Set API token',
  LOGOUT = '[auth-app] Logout from app',
}

export const setToken = createAction(
  AuthAppAction.SET_TOKEN,
  props<{ token: string }>()
);

export const logout = createAction(
  AuthAppAction.LOGOUT
);

