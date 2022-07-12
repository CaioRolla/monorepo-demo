import { createAction, props } from '@ngrx/store';

export enum ManageAccountAction {
  RESET_STATE = '[cron-app-feature-manage-account] Reset state',
}

export const resetState = createAction(ManageAccountAction.RESET_STATE);
