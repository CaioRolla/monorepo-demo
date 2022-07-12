import {  createAction, props } from '@ngrx/store';

import { Account } from '@nui/cron-shared/core';
import { ErrorResponseDto } from '@nui/shared/utils';

export enum AccountAction {
  RESET_STATE = '[cron-app-account] Reset state',

  LOAD_ACCOUNT = '[cron-app-account] Load user account',
  LOAD_ACCOUNT_SUCCESS = '[cron-app-account] Loaded user account successfully',
  LOAD_ACCOUNT_FAILURE = '[cron-app-account] Failed to load user account',

  CLEAR_ACCOUNT = '[cron-app-account] Clear selected account',

  KEEP_ACCOUNT_UPDATED = '[cron-app-account] Keep account updated',
  STOP_KEEPING_ACCOUNT_UPDATED = '[cron-app-account] Stop keeping account updated',

  OPEN_STRIPE_CUSTOMER_PORTAL = '[feedback-app-account] Open Stripe customer portal',
  OPEN_STRIPE_CUSTOMER_PORTAL_SUCCESS = '[feedback-app-account] Opened Stripe customer portal',
  OPEN_STRIPE_CUSTOMER_PORTAL_FAILURE = '[feedback-app-account] Failed to open Stripe customer portal',
}

export const openStripePortal = createAction(
  AccountAction.OPEN_STRIPE_CUSTOMER_PORTAL
);

export const openStripePortalSuccess = createAction(
  AccountAction.OPEN_STRIPE_CUSTOMER_PORTAL_SUCCESS,
  props<{ url: string }>()
);

export const openStripePortalFailure = createAction(
  AccountAction.OPEN_STRIPE_CUSTOMER_PORTAL_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const keepAccountUpdated = createAction(
  AccountAction.KEEP_ACCOUNT_UPDATED
);

export const stopKeepingAccountUpdated = createAction(
  AccountAction.STOP_KEEPING_ACCOUNT_UPDATED
);

export const resetState = createAction(AccountAction.RESET_STATE);

export const loadAccount = createAction(
  AccountAction.LOAD_ACCOUNT
);

export const loadAccountSuccess = createAction(
  AccountAction.LOAD_ACCOUNT_SUCCESS,
  props<{ res: Account }>()
);

export const loadAccountFailure = createAction(
  AccountAction.LOAD_ACCOUNT_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const clearAccount = createAction(
  AccountAction.CLEAR_ACCOUNT
);
