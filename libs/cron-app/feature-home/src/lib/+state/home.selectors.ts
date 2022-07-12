import { createFeatureSelector, createSelector } from '@ngrx/store';

import { HomeState, FEATURE_KEY } from './home.reducer';

export const selectState = createFeatureSelector<HomeState>(FEATURE_KEY);

export const selectStats = createSelector(selectState, (state) => state.stats);

export const selectLoadingStats = createSelector(
  selectState,
  (state) => state.loadingStats
);

export const selectLoadStatsError = createSelector(
  selectState,
  (state) => state.loadStatsError
);

export const selectStatsExecutionsCount = createSelector(
  selectStats,
  (stats) => stats?.executionsCount
);

export const selectStatsFailureExecutionsCount = createSelector(
  selectStats,
  (stats) => stats?.failureExecutionsCount
);

export const selectStatsSuccessExecutionsCount = createSelector(
  selectStats,
  (stats) => stats?.successExecutionsCount
);

export const selectStatsSchedules = createSelector(
  selectStats,
  (stats) => stats?.schedules || []
);

export const selectStatsSchedulesCount = createSelector(
  selectStats,
  (stats) => stats?.schedules?.length || 0
);

export const selectSchedulesPage = createSelector(
  selectState,
  (state) => state.schedulesPage
);

export const selectPaginatedSchedules = createSelector(
  selectStatsSchedules,
  selectSchedulesPage,
  (schedules, page) => {
    const perPage = 5;
    return schedules.slice(page * perPage, page * perPage + perPage);
  }
);

export const selectDisableNextSchedules = createSelector(
  selectSchedulesPage,
  selectStatsSchedules,
  (page, schedules) => {
    const nextPage = page + 1;
    const perPage = 5;
    return (
      schedules.slice(nextPage * perPage, nextPage * perPage + perPage)
        .length <= 0
    );
  }
);

export const selectDisablePreviousSchedules = createSelector(
  selectSchedulesPage,
  (page) => {
    const nextPage = page - 1;
    return nextPage < 0;
  }
);

export const selectPaginatedSchedulesCount = createSelector(
  selectPaginatedSchedules,
  (schedules) => schedules.length
);

export const selectDisplayEmptyMessage = createSelector(
  selectStatsSchedules,
  selectLoadingStats,
  (schedules, loading) => schedules.length === 0 && !loading
);