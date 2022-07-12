import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ManageAccountState, FEATURE_KEY } from './manage-account.reducer';

export const selectState =
  createFeatureSelector<ManageAccountState>(FEATURE_KEY);
