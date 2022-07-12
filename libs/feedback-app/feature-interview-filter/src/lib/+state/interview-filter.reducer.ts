import { createReducer, on, Action } from '@ngrx/store';
import {
  ErrorResponseDto,
  GetAllInterviewFilterDto,
  GetSurveyFilterDataDto,
} from '@nui/feedback-shared/core';

import * as InterviewFilterActions from './interview-filter.actions';

export const FEATURE_KEY = 'interviewFilter';

export interface InterviewFilterState {
  filterData?: GetSurveyFilterDataDto;
  loadingfilterData: boolean;
  identifiersError?: ErrorResponseDto;

  initialFilter?: GetAllInterviewFilterDto;
  filter?: GetAllInterviewFilterDto;
  appliedFilter?: GetAllInterviewFilterDto;
}

export const initialState: InterviewFilterState = {
  loadingfilterData: false,
};

const featureReducer = createReducer(
  initialState,
  on(InterviewFilterActions.loadfilterData, (state, action) => ({
    ...state,
    loadingfilterData: true,
    filter: {
      identifiers: [],
      surveyId: action.surveyId,
    },
    initialFilter: {
      identifiers: [],
      surveyId: action.surveyId,
    },
  })),
  on(InterviewFilterActions.loadfilterDataSuccess, (state, action) => ({
    ...state,
    loadingfilterData: false,
    filterData: action.res,
    filter: {
      ...(state.filter ? state.filter : ({} as any)),
      identifiers: action.res.identifiers.map((id) => ({
        key: id.key,
        values: [],
      })),
    },
    initialFilter: {
      ...(state.filter ? state.filter : ({} as any)),
      identifiers: action.res.identifiers.map((id) => ({
        key: id.key,
        values: [],
      })),
    },
  })),
  on(InterviewFilterActions.loadfilterDataFailure, (state, action) => ({
    ...state,
    loadingfilterData: false,
    identifiersError: action.error,
  })),
  on(InterviewFilterActions.registerFilterChange, (state, action) => ({
    ...state,
    filter: {
      ...(state.filter ? state.filter : ({} as any)),
      identifiers: state.filter?.identifiers.map((id) => {
        if (id.key !== action.key) {
          return id;
        }

        return {
          ...id,
          values: action.checked
            ? [...id.values, action.value]
            : id.values.filter((v) => v !== action.value),
        };
      }),
    },
  })),
  on(InterviewFilterActions.resetState, (state, action) => ({
    ...initialState,
  })),
  on(InterviewFilterActions.applyFilter, (state, action) => ({
    ...state,
    appliedFilter: {
      ...(state.filter ? state.filter : ({} as any)),
      identifiers: state.filter?.identifiers.filter(
        (id) => id.values.length > 0
      ),
    },
  })),
  on(InterviewFilterActions.clearFilter, (state, action) => ({
    ...state,
    appliedFilter: {
      ...(state.initialFilter ? state.initialFilter : ({} as any)),
      identifiers: state.initialFilter?.identifiers.filter(
        (id) => id.values.length > 0
      ),
    },
    filter: state.initialFilter,
  }))
);

export function reducer(
  state: InterviewFilterState | undefined,
  action: Action
) {
  return featureReducer(state, action);
}
