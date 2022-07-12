import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LoginMerchState, FEATURE_KEY } from './login-merch.reducer';

export const selectState = createFeatureSelector<LoginMerchState>(FEATURE_KEY);
