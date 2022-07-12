import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InterviewFilterState, FEATURE_KEY } from './interview-filter.reducer';

export const selectState =
  createFeatureSelector<InterviewFilterState>(FEATURE_KEY);



export const selectLoadingfilterData = createSelector(
  selectState,
  (state) => state.loadingfilterData
);

export const selectFilterDataError = createSelector(
  selectState,
  (state) => state.identifiersError
);

export const selectFilterData = createSelector(
  selectState,
  (state) => state.filterData
);

export const selectFilterDataIdentifiers = createSelector(
  selectFilterData,
  (data) => data?.identifiers || []
);

export const selectDisplayEmptyMessage = createSelector(
  selectLoadingfilterData,
  selectFilterDataIdentifiers,
  (loading, identifiers) =>
    (!identifiers || identifiers.length === 0) && !loading
);

export const selectFilter = createSelector(
  selectState,
  (state) => state.filter
);

export const selectAppliedFilter = createSelector(
  selectState,
  (state) => state.appliedFilter
);
