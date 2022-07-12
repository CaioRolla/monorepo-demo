import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SaveScheduleState, FEATURE_KEY } from './save-schedule.reducer';

export const selectState =
  createFeatureSelector<SaveScheduleState>(FEATURE_KEY);

export const selectSchedule = createSelector(
  selectState,
  (state) => state.schedule
);

export const selectLoadScheduleError = createSelector(
  selectState,
  (state) => state.loadScheduleError
);

export const selectLoadingSchedule = createSelector(
  selectState,
  (state) => state.loadingSchedule
);

export const selectSavingSchedule = createSelector(
  selectState,
  (state) => state.savingSchedule
);

export const selectSaveScheduleError = createSelector(
  selectState,
  (state) => state.saveScheduleError
);
