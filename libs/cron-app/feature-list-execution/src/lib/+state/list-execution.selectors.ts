import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ListExecutionState, FEATURE_KEY } from './list-execution.reducer';

export const selectState =
  createFeatureSelector<ListExecutionState>(FEATURE_KEY);

  export const selectLoadingExecutions = createSelector(
    selectState,
    (state) => state.loadingExecutions
  );

  
  export const selectLoadingExecutionsSilently = createSelector(
    selectState,
    (state) => state.loadingExecutionsSilently
  );
  

export const selectExecutionsRes = createSelector(
  selectState,
  (state) => state.executionsRes
);

export const selectExecutionsResData = createSelector(
  selectExecutionsRes,
  (res) => res?.data || []
);

export const selectExecutionsResDataCount = createSelector(
  selectExecutionsResData,
  (data) => data.length
);

export const selectLoadExecutionsError = createSelector(
  selectState,
  (state) => state.loadExecutionsError
);

export const selectExecutionsQuery = createSelector(
  selectState,
  (state) => state.executionsQuery
);

export const selectExecutionsPage = createSelector(
  selectExecutionsQuery,
  (query) => query?.page || 0
);

export const selectDisableNextExecutions = createSelector(
  selectExecutionsRes,
  selectExecutionsQuery,
  (res, query) => {
    return !res?.totalPages || (res?.totalPages  - 1) === query?.page;
  }
);

export const selectDisablePreviousExecutions = createSelector(
  selectExecutionsPage,
  (page) => {
    const nextPage = page - 1;
    return nextPage < 0;
  }
);

export const selectPaginatedExecutionsCount = createSelector(
  selectExecutionsRes,
  (executions) => executions?.totalAmount || 0
);

export const selectDisplayEmptyMessage = createSelector(
  selectExecutionsResData,
  selectLoadingExecutions,
  (executions, loading) => executions.length === 0 && !loading
);
