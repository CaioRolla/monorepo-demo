import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SettingsSurveyState, FEATURE_KEY } from './settings-survey.reducer';

export const selectState =
  createFeatureSelector<SettingsSurveyState>(FEATURE_KEY);

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

export const selectPatchingSurvey = createSelector(
  selectState,
  (state) => state.patchingSurvey
);

export const selectIdentifiersRes = createSelector(
  selectState,
  (state) => state.identifiersRes
);

export const selectLoadingIdentifiers = createSelector(
  selectState,
  (state) => state.loadingIdentifiers
);

export const selectIdentifiersError = createSelector(
  selectState,
  (state) => state.identifiersError
);

export const selectIdentifiers = createSelector(
  selectIdentifiersRes,
  (res) => res?.data || []
);

export const selectIdentifiersTotalAmount = createSelector(
  selectIdentifiersRes,
  (res) => res?.totalAmount || 0
);

export const selectIdentifiersPages = createSelector(
  selectIdentifiersRes,
  (res) => res?.totalPages || 0
);

export const selectIdentifiersPage = createSelector(
  selectState,
  (state) => state.identifiersPage
);

export const selectPaginatedIdentifiers = createSelector(
  selectIdentifiers,
  selectIdentifiersPage,
  (identifiers, page) => {
    const perPage = 5;
    return identifiers.slice(page * perPage, page * perPage + perPage);
  }
);

export const selectDisplayEmptyIdentifiersMessage = createSelector(
  selectIdentifiersTotalAmount,
  selectLoadingIdentifiers,
  (amount, loadingIdentifiers) => amount <= 0 && !loadingIdentifiers
);

export const selectShowingIdentifiers = createSelector(
  selectPaginatedIdentifiers,
  (identifiers) => identifiers.length
);

export const selectDisablePreviousIdentifier = createSelector(
  selectIdentifiersPage,
  (page) => page === 0
);

export const selectDisableNextIdentifier = createSelector(
  selectIdentifiersPage,
  selectIdentifiers,
  (page, identifiers) => {
    const nextPage = page + 1;
    const perPage = 5;
    return (
      identifiers.slice(nextPage * perPage, nextPage * perPage + perPage)
        .length <= 0
    );
  }
);
