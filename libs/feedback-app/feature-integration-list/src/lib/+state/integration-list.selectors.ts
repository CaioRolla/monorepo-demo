import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IntegrationListState, FEATURE_KEY } from './integration-list.reducer';

export const selectState =
  createFeatureSelector<IntegrationListState>(FEATURE_KEY);
