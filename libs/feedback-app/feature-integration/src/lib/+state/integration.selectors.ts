import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IntegrationState, FEATURE_KEY } from './integration.reducer';

export const selectState = createFeatureSelector<IntegrationState>(FEATURE_KEY);
