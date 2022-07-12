import { createAction, props } from '@ngrx/store';

import {
  ErrorResponseDto,
  FinishInterviewDto,
  Interview,
  StartInterviewDto,
  StartInterviewResponseDto,
} from '@nui/feedback-shared/core';

export enum InterviewAction {
  START_INTERVIEW = '[feedback-app-feature-interview] Start interview',
  START_INTERVIEW_SUCCESS = '[feedback-app-feature-interview] Started interview successfully',
  START_INTERVIEW_FAILURE = '[feedback-app-feature-interview] Failed to start interview',

  FINISH_INTERVIEW = '[feedback-app-feature-interview] Finish interview',
  FINISH_INTERVIEW_SUCCESS = '[feedback-app-feature-interview] Finished interview successfully',
  FINISH_INTERVIEW_FAILURE = '[feedback-app-feature-interview] Failed to finish interview',

  ANSWER_PRIMARY_QUESTION = '[feedback-app-feature-interview] Answer primary question',
  ANSWER_OPEN_QUESTION = '[feedback-app-feature-interview] Answer open question',

  NEXT_QUESTION = '[feedback-app-feature-interview] Next question',
  PREVIOUS_QUESTION = '[feedback-app-feature-interview] Previous question',

  RESET_STATE = '[feedback-app-feature-interview] Reset state',
}

export const previousQuestion = createAction(InterviewAction.PREVIOUS_QUESTION);

export const nextQuestion = createAction(InterviewAction.NEXT_QUESTION);

export const answerPrimaryQuestion = createAction(
  InterviewAction.ANSWER_PRIMARY_QUESTION,
  props<{ primaryQuestionAnswer: number }>()
);

export const answerOpenQuestion = createAction(
  InterviewAction.ANSWER_OPEN_QUESTION,
  props<{ openQuestionAnswer?: string }>()
);

export const finishInterview = createAction(
  InterviewAction.FINISH_INTERVIEW
);

export const finishInterviewSuccess = createAction(
  InterviewAction.FINISH_INTERVIEW_SUCCESS,
  props<{ res: Interview }>()
);

export const finishInterviewFailure = createAction(
  InterviewAction.FINISH_INTERVIEW_SUCCESS,
  props<{ error: ErrorResponseDto }>()
);

export const startInterview = createAction(
  InterviewAction.START_INTERVIEW,
  props<{ startDto: StartInterviewDto }>()
);

export const startInterviewSuccess = createAction(
  InterviewAction.START_INTERVIEW_SUCCESS,
  props<{ res: StartInterviewResponseDto }>()
);

export const startInterviewFailure = createAction(
  InterviewAction.START_INTERVIEW_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resetState = createAction(InterviewAction.RESET_STATE);
