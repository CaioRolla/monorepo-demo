import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CreateSurveyState, FEATURE_KEY } from './create-survey.reducer';

export const selectState =
  createFeatureSelector<CreateSurveyState>(FEATURE_KEY);

export const selectCreatingSurvey = createSelector(
  selectState,
  (state) => state.creatingSurvey
);
