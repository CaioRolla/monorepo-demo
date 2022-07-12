import {  createAction, props } from '@ngrx/store';

import {
  CreateIntegrationDto,
  ErrorResponseDto,
  Integration,
} from '@nui/feedback-shared/core';

export enum CreateIntegrationAction {
  RESET_STATE = '[feedback-app-feature-create-integration] Reset state',

  CREATE_INTEGRATION = '[feedback-app-feature-create-integration] Create integration',
  CREATE_INTEGRATION_SUCCESS = '[feedback-app-feature-create-integration] Created integration',
  CREATE_INTEGRATION_FAILURE = '[feedback-app-feature-create-integration] Failed to create integration',
}

export const createIntegration = createAction(
  CreateIntegrationAction.CREATE_INTEGRATION,
  props<{ createDto: CreateIntegrationDto }>()
);

export const createIntegrationSuccess = createAction(
  CreateIntegrationAction.CREATE_INTEGRATION_SUCCESS,
  props<{ res: Integration }>()
);

export const createIntegrationFailure = createAction(
  CreateIntegrationAction.CREATE_INTEGRATION_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resetState = createAction(CreateIntegrationAction.RESET_STATE);
