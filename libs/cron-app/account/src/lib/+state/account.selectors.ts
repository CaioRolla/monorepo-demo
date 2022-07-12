import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountPlan } from '@nui/cron-shared/core';

import { AccountState, FEATURE_KEY } from './account.reducer';

export const selectState = createFeatureSelector<AccountState>(FEATURE_KEY);

export const selectLoadingAccount = createSelector(
  selectState,
  (state) => state.loadingAccount
);

export const selectLoadAccountError = createSelector(
  selectState,
  (state) => state.loadAccountError
);

export const selectAccount = createSelector(
  selectState,
  (state) => state.account
);

export const selectKeepAccountUpdated = createSelector(
  selectState,
  (state) => state.keepAccountUpdated
);

export const selectAcountPlan = createSelector(
  selectAccount,
  (account) => account?.plan
);

export const selectAcountCanSubscribePlan = createSelector(
  selectAcountPlan,
  (plan) => (plan ? [AccountPlan.FREE].includes(plan) : false)
);

export const selectAcountIsStripe = createSelector(selectAcountPlan, (plan) =>
  plan
    ? [
        AccountPlan.DEVELOPER,
        AccountPlan.SCALE,
        AccountPlan.UNLIMITED,
      ].includes(plan)
    : false
);
