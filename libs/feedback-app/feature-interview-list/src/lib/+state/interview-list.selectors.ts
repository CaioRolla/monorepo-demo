import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InterviewListState, FEATURE_KEY } from './interview-list.reducer';

export const selectState =
  createFeatureSelector<InterviewListState>(FEATURE_KEY);

export const selectLoadingInterviews = createSelector(
  selectState,
  (state) => state.loadingInterviews
);

export const selectInterviewsRes = createSelector(
  selectState,
  (state) => state.interviewsRes
);

export const selectInterviewsError = createSelector(
  selectState,
  (state) => state.interviewsError
);

export const selectInterviewsPage = createSelector(
  selectState,
  (state) => state.interviewsPage
);

export const selectAppliedFilter = createSelector(
  selectState,
  (state) => state.appliedFilter
);

export const selectInterviews = createSelector(
  selectInterviewsRes,
  (res) => res?.data || []
);

export const selectInterviewsTotalAmount = createSelector(
  selectInterviewsRes,
  (res) => res?.totalAmount || 0
);

export const selectInterviewsTotalPages = createSelector(
  selectInterviewsRes,
  (res) => res?.totalPages || 0
);

export const selectPaginatedInterviews = createSelector(
  selectInterviews,
  selectInterviewsPage,
  (interviews, page) => {
    const perPage = 5;
    return interviews.slice(page * perPage, page * perPage + perPage);
  }
);

export const selectDisplayEmptyInterviewsMessage = createSelector(
  selectInterviewsTotalAmount,
  selectLoadingInterviews,
  (amount, loading) => amount <= 0 && !loading
);

export const selectDisablePreviousInterviews = createSelector(
  selectInterviewsPage,
  (page) => page === 0
);

export const selectDisableNextInterviews = createSelector(
  selectInterviewsPage,
  selectInterviews,
  (page, interviews) => {
    const nextPage = page + 1;
    const perPage = 5;
    return (
      interviews.slice(nextPage * perPage, nextPage * perPage + perPage)
        .length <= 0
    );
  }
);

export const selectShowingInterviews = createSelector(
  selectPaginatedInterviews,
  (interviews) => interviews.length
);
