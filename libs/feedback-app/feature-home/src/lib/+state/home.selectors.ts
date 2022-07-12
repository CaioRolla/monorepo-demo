import { createFeatureSelector, createSelector } from '@ngrx/store';

import { HomeState, FEATURE_KEY } from './home.reducer';

export const selectState = createFeatureSelector<HomeState>(FEATURE_KEY);

export const selectSurveysRes = createSelector(
  selectState,
  (state) => state.surveysRes
);

export const selectSurveysError = createSelector(
  selectState,
  (state) => state.surveysError
);

export const selectLoadingSurveys = createSelector(
  selectState,
  (state) => state.loadingSurveys
);

export const selectSurveysPage = createSelector(
  selectState,
  (state) => state.surveysPage
);

export const selectSurveys = createSelector(
  selectSurveysRes,
  (surveysRes) => surveysRes?.data || []
);

export const selectSurveysTotalAmount = createSelector(
  selectSurveysRes,
  (surveysRes) => surveysRes?.totalAmount || 0
);

export const selectSurveysPages = createSelector(
  selectSurveysRes,
  (surveysRes) => surveysRes?.totalPages || 0
);

export const selectPaginatedSurveys = createSelector(
  selectSurveys,
  selectSurveysPage,
  (surveys, page) => {
    const perPage = 5;
    return surveys.slice(page * perPage, page * perPage + perPage);
  }
);

export const selectDisplayEmptySurveysMessage = createSelector(
  selectSurveysTotalAmount,
  selectLoadingSurveys,
  (amount, loadingSurveys) => amount <= 0 && !loadingSurveys
);

export const selectShowingSurveys = createSelector(
  selectPaginatedSurveys,
  (surveys) => surveys.length
);

export const selectDisablePreviousSurvey = createSelector(
  selectSurveysPage,
  (page) => page === 0
);

export const selectDisableNextSurvey = createSelector(
  selectSurveysPage,
  selectSurveys,
  (page, surveys) => {
    const nextPage = page + 1;
    const perPage = 5;
    return (
      surveys.slice(nextPage * perPage, nextPage * perPage + perPage)
        .length <= 0
    );
  }
);
