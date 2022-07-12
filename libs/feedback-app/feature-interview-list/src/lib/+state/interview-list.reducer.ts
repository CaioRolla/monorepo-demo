import { createReducer, on, Action } from '@ngrx/store';
import {
  ErrorResponseDto,
  GetAllInterviewDto,
  GetAllInterviewFilterDto,
  GetAllResponseDto,
} from '@nui/feedback-shared/core';

import * as InterviewListActions from './interview-list.actions';

export const FEATURE_KEY = 'interviewList';

export interface InterviewListState {
  loadingInterviews: boolean;
  interviewsRes?: GetAllResponseDto<GetAllInterviewDto>;
  interviewsError?: ErrorResponseDto;
  interviewsPage: number;

  appliedFilter?: GetAllInterviewFilterDto;
}

export const initialState: InterviewListState = {
  loadingInterviews: false,
  interviewsPage: 0,
};

const featureReducer = createReducer(
  initialState,
  on(InterviewListActions.nextInterviewsPage, (state, action) => ({
    ...state,
    interviewsPage: state.interviewsPage + 1,
  })),
  on(InterviewListActions.previousInterviewsPage, (state, action) => ({
    ...state,
    interviewsPage: state.interviewsPage - 1,
  })),
  on(InterviewListActions.loadInterviews, (state, action) => ({
    ...state,
    loadingInterviews: true,
    appliedFilter: action.filter,
  })),
  on(InterviewListActions.loadInterviewsSuccess, (state, action) => ({
    ...state,
    loadingInterviews: false,
    interviewsRes: action.res,
    interviewsPage: 0
  })),
  on(InterviewListActions.loadInterviewsFailure, (state, action) => ({
    ...state,
    loadingInterviews: false,
    interviewsError: action.error,
    interviewsPage: 0
  })),
  on(InterviewListActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: InterviewListState | undefined, action: Action) {
  return featureReducer(state, action);
}
