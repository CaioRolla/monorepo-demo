import { createReducer, on, Action } from '@ngrx/store';

import {
  ErrorResponseDto,
  Interview,
  StartInterviewResponseDto,
} from '@nui/feedback-shared/core';
import * as InterviewActions from './interview.actions';

export const FEATURE_KEY = 'interview';

export interface InterviewState {
  starting: boolean;
  startError?: ErrorResponseDto;
  startRes?: StartInterviewResponseDto;

  finishing: boolean;
  finishError?: ErrorResponseDto;
  finishRes?: Interview;

  primaryQuestionAnswer?: number;
  currentQuestionIndex: number;

  openQuestionAnswer?: string;
}

export const initialState: InterviewState = {
  starting: false,

  finishing: false,

  currentQuestionIndex: 0,
};

const featureReducer = createReducer(
  initialState,
  on(InterviewActions.previousQuestion, (state, action) => ({
    ...state,
    currentQuestionIndex: state.currentQuestionIndex - 1,
  })),
  on(InterviewActions.nextQuestion, (state, action) => ({
    ...state,
    currentQuestionIndex: state.currentQuestionIndex + 1,
  })),
  on(InterviewActions.answerOpenQuestion, (state, action) => ({
    ...state,
    openQuestionAnswer: action.openQuestionAnswer,
  })),
  on(InterviewActions.answerPrimaryQuestion, (state, action) => ({
    ...state,
    primaryQuestionAnswer: action.primaryQuestionAnswer,
    currentQuestionIndex: state.startRes?.openQuestionEnabled
      ? state.currentQuestionIndex + 1
      : 0,
  })),
  on(InterviewActions.finishInterview, (state, action) => ({
    ...state,
    finishing: true,
  })),
  on(InterviewActions.finishInterviewSuccess, (state, action) => ({
    ...state,
    finishing: false,
    finishRes: action.res,
    currentQuestionIndex: 2,
  })),
  on(InterviewActions.finishInterviewFailure, (state, action) => ({
    ...state,
    finishing: false,
    finishError: action.error,
  })),
  on(InterviewActions.startInterview, (state, action) => ({
    ...state,
    starting: true,
    primaryQuestionAnswer: action.startDto.primaryQuestionAnswer,
  })),
  on(InterviewActions.startInterviewSuccess, (state, action) => ({
    ...state,
    starting: false,
    startRes: action.res,
    currentQuestionIndex:
      state.primaryQuestionAnswer !== undefined &&
      action.res.openQuestionEnabled
        ? 1
        : 0,
  })),
  on(InterviewActions.startInterviewFailure, (state, action) => ({
    ...state,
    starting: false,
    startError: action.error,
  })),
  on(InterviewActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: InterviewState | undefined, action: Action) {
  return featureReducer(state, action);
}
