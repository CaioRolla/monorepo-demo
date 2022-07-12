import {  createAction, props } from '@ngrx/store';

export enum TermsAction {
  RESET_STATE = '[feedback-app-feature-terms] Reset state',
}

export const resetState = createAction(TermsAction.RESET_STATE);
