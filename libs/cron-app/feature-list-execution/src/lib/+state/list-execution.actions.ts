import { createAction, props } from '@ngrx/store';
import {
  GetAllExecutionDto,
  GetAllExecutionQueryDto,
} from '@nui/cron-shared/core';
import { ErrorResponseDto, GetAllResponseDto } from '@nui/shared/utils';

export enum ListExecutionAction {
  RESET_STATE = '[cron-app-feature-list-execution] Reset state',
  LOAD_EXECUTIONS = '[cron-app-feature-list-execution] Load executions',
  LOAD_EXECUTIONS_SUCCESS = '[cron-app-feature-list-execution] Loaded executions',
  LOAD_EXECUTIONS_FAILURE = '[cron-app-feature-list-execution] Failed to load executions',

  NEXT_SCHEDULES = '[cron-app-feature-list-execution] Next schedules table ',
  PREVIOUS_SCHEDULES = '[cron-app-feature-list-execution] Previous schedules table page',
}

export const loadExecutions = createAction(
  ListExecutionAction.LOAD_EXECUTIONS,
  props<{ query: GetAllExecutionQueryDto }>()
);

export const loadExecutionsSuccess = createAction(
  ListExecutionAction.LOAD_EXECUTIONS_SUCCESS,
  props<{ res: GetAllResponseDto<GetAllExecutionDto> }>()
);

export const loadExecutionsFailure = createAction(
  ListExecutionAction.LOAD_EXECUTIONS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const nextExecutions = createAction(ListExecutionAction.NEXT_SCHEDULES);

export const previousExecutions = createAction(
  ListExecutionAction.PREVIOUS_SCHEDULES
);

export const resetState = createAction(ListExecutionAction.RESET_STATE);
