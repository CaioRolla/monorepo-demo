import {  createAction, props } from '@ngrx/store';
import { ErrorResponseDto, GetAllInterviewDto, GetAllInterviewFilterDto, GetAllResponseDto } from '@nui/feedback-shared/core';

export enum InterviewListAction {
  RESET_STATE = '[feedback-app-feature-interview-list] Reset state',

  LOAD_INTERVIEWS = '[feedback-app-feature-interview-list] Load interview list',
  LOAD_INTERVIEWS_SUCCESS = '[feedback-app-feature-interview-list] Load interview list success',
  LOAD_INTERVIEWS_FAILURE = '[feedback-app-feature-interview-list] Failed to load interview list',

  NEXT_INTERVIEWS_PAGE = `[feedback-app-feature-interview-list] Next interviews page`,
  PREVIOUS_INTERVIEWS_PAGE = `[feedback-app-feature-interview-list] Previous interviews page`,
}

export const nextInterviewsPage = createAction(InterviewListAction.NEXT_INTERVIEWS_PAGE);

export const previousInterviewsPage = createAction(InterviewListAction.PREVIOUS_INTERVIEWS_PAGE);


export const loadInterviews = createAction(
  InterviewListAction.LOAD_INTERVIEWS,
  props<{ filter: GetAllInterviewFilterDto }>()
);

export const loadInterviewsSuccess = createAction(
  InterviewListAction.LOAD_INTERVIEWS_SUCCESS,
  props<{ res: GetAllResponseDto<GetAllInterviewDto> }>()
);

export const loadInterviewsFailure = createAction(
  InterviewListAction.LOAD_INTERVIEWS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resetState = createAction(InterviewListAction.RESET_STATE);
