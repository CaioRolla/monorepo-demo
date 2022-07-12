import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InterviewState, FEATURE_KEY } from './interview.reducer';

export const selectState = createFeatureSelector<InterviewState>(FEATURE_KEY);

export const selectStarting = createSelector(
  selectState,
  (state) => state.starting
);

export const selectStartError = createSelector(
  selectState,
  (state) => state.startError
);

export const selectStartRes = createSelector(
  selectState,
  (state) => state.startRes
);

export const selectFinishing = createSelector(
  selectState,
  (state) => state.finishing
);

export const selectFinishError = createSelector(
  selectState,
  (state) => state.finishError
);

export const selectFinishRes = createSelector(
  selectState,
  (state) => state.finishRes
);

export const selectPrimaryQuestionAnswer = createSelector(
  selectState,
  (state) => state.primaryQuestionAnswer
);

export const selectCurrentQuestionIndex = createSelector(
  selectState,
  (state) => state.currentQuestionIndex
);

export const selectDisablePrevious = createSelector(
  selectCurrentQuestionIndex,
  (currentQuestionIndex) => currentQuestionIndex === 0
);

export const selectOpenQuestionAnswer = createSelector(
  selectState,
  (state) => state.openQuestionAnswer
);

export const selectOpenQuestionEnabled = createSelector(
  selectStartRes,
  (startRes) => startRes?.openQuestionEnabled
);

export const selectOpenQuestionOptional = createSelector(
  selectStartRes,
  (startRes) => startRes?.openQuestionOptional
);

export const selectRedirectAfterCompleted = createSelector(
  selectStartRes,
  (startRes) => startRes?.redirectAfterCompleted
);

export const selectPrimaryQuestionTitle = createSelector(
  selectStartRes,
  (startRes) => startRes?.primaryQuestionTitle
);

export const selectOpenQuestionTitle = createSelector(
  selectStartRes,
  (startRes) => startRes?.openQuestionTitle
);

export const selectCustomLogo = createSelector(
  selectStartRes,
  (startRes) => startRes?.customLogo
);

export const selectLogoUrl = createSelector(
  selectStartRes,
  (startRes) => startRes?.logoUrl
);

export const selectType = createSelector(
  selectStartRes,
  (startRes) => startRes?.type
);

export const selectDisableNext = createSelector(
  selectCurrentQuestionIndex,
  selectStartRes,
  selectOpenQuestionAnswer,
  selectPrimaryQuestionAnswer,
  (currentQuestionIndex, startRes, openQuestionAnswer, primaryQuestionAnswer) =>
    primaryQuestionAnswer === undefined ||
    (currentQuestionIndex === 1 &&
      !startRes?.openQuestionOptional &&
      !openQuestionAnswer)
);
