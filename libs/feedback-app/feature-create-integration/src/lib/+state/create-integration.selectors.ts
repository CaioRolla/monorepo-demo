import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CreateIntegrationState,
  FEATURE_KEY,
} from './create-integration.reducer';

export const selectState =
  createFeatureSelector<CreateIntegrationState>(FEATURE_KEY);

export const selectCreatingIntegration = createSelector(
  selectState,
  (state) => state.creatingIntegration
);
