import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TermsState, FEATURE_KEY } from './terms.reducer';

export const selectState = createFeatureSelector<TermsState>(FEATURE_KEY);
