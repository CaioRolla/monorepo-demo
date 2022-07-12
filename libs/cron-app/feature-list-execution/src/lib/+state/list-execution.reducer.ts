import { createReducer, on, Action } from '@ngrx/store';

import * as ListExecutionActions from './list-execution.actions';
import { ErrorResponseDto, GetAllResponseDto } from '@nui/shared/utils';
import {
  GetAllExecutionDto,
  GetAllExecutionQueryDto,
} from '@nui/cron-shared/core';
export const FEATURE_KEY = 'listExecution';

export interface ListExecutionState {
  executionsQuery?: GetAllExecutionQueryDto;
  loadingExecutions: boolean;
  executionsRes?: GetAllResponseDto<GetAllExecutionDto>;
  loadExecutionsError?: ErrorResponseDto;
  loadingExecutionsSilently: boolean;
}

export const initialState: ListExecutionState = {
  loadingExecutions: false,
  loadingExecutionsSilently: false,
};

const featureReducer = createReducer(
  initialState,

  on(ListExecutionActions.nextExecutions, (state, action) => ({
    ...state,
    executionsQuery: state.executionsQuery
      ? {
          ...state.executionsQuery,
          page: (state.executionsQuery.page || 0) + 1,
        }
      : {
          page: 0,
        },
    loadingExecutionsSilently: true,
  })),

  on(ListExecutionActions.previousExecutions, (state, action) => ({
    ...state,
    executionsQuery: state.executionsQuery
      ? {
          ...state.executionsQuery,
          page: (state.executionsQuery.page || 0) - 1,
        }
      : {
          page: 0,
        },
    loadingExecutionsSilently: true,
  })),

  on(ListExecutionActions.loadExecutions, (state, action) => ({
    ...state,
    loadingExecutions: true,
    executionsQuery: action.query,
  })),

  on(ListExecutionActions.loadExecutionsSuccess, (state, action) => ({
    ...state,
    loadingExecutions: false,
    executionsRes: action.res,
    loadingExecutionsSilently: false,
  })),

  on(ListExecutionActions.loadExecutionsFailure, (state, action) => ({
    ...state,
    loadingExecutions: false,
    loadExecutionsError: action.error,
    loadingExecutionsSilently: false,
  })),

  on(ListExecutionActions.resetState, (state, action) => ({
    ...initialState,
  }))
);

export function reducer(state: ListExecutionState | undefined, action: Action) {
  return featureReducer(state, action);
}
