import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DeleteSurveyState, FEATURE_KEY } from './delete-survey.reducer';

export const selectState =
  createFeatureSelector<DeleteSurveyState>(FEATURE_KEY);

export const selectDeletingSurvey = createSelector(
  selectState,
  (state) => state.deletingSurvey
);
