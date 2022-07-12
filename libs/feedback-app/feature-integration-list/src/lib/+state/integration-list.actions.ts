import {  createAction, props } from '@ngrx/store';

export enum IntegrationListAction {
  RESET_STATE = '[feedback-app-feature-integration-list] Reset state',
}

export const resetState = createAction(IntegrationListAction.RESET_STATE);
