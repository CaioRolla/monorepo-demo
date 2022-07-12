import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SetupSurveyState, FEATURE_KEY } from './setup-survey.reducer';

export const selectState = createFeatureSelector<SetupSurveyState>(FEATURE_KEY);

export const selectLoadingSurvey = createSelector(
  selectState,
  (state) => state.loadingSurvey
);

export const selectLoadedSurvey = createSelector(
  selectState,
  (state) => state.loadedSurvey
);

export const selectLoadSurveyError = createSelector(
  selectState,
  (state) => state.loadSurveyError
);

export const selectSetuppingSurvey = createSelector(
  selectState,
  (state) => state.setuppingSurvey
);
