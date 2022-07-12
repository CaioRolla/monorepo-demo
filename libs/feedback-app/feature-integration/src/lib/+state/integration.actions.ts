import {  createAction, props } from '@ngrx/store';

export enum IntegrationAction {
  RESET_STATE = '[feedback-app-feature-integration] Reset state',
}

export const resetState = createAction(IntegrationAction.RESET_STATE);
