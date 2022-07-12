import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SurveyDashboardState, FEATURE_KEY } from './survey-dashboard.reducer';

export const selectState =
  createFeatureSelector<SurveyDashboardState>(FEATURE_KEY);

export const selectStats = createSelector(selectState, (state) => state.stats);

export const selectStatsError = createSelector(
  selectState,
  (state) => state.statsError
);

export const selectLoadingStats = createSelector(
  selectState,
  (state) => state.loadingStats
);

export const selectAppliedFilter = createSelector(
  selectState,
  (state) => state.appliedFilter
);
