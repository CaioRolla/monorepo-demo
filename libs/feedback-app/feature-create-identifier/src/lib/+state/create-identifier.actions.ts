import {  createAction, props } from '@ngrx/store';

import {
  CreateIdentifierDto,
  ErrorResponseDto,
  Identifier,
} from '@nui/feedback-shared/core';

export enum CreateIdentifierAction {
  CREATE_IDENTIFIER = '[CreateIdentifier] Create Identifier',
  CREATE_IDENTIFIER_SUCCESS = '[CreateIdentifier] Created Identifier successfully',
  CREATE_IDENTIFIER_FAILURE = '[CreateIdentifier] Failed to create Identifier',

  RESET_STATE = '[feedback-app-feature-create-identifier] Reset state',
}

export const resetState = createAction(CreateIdentifierAction.RESET_STATE);

export const createIdentifier = createAction(
  CreateIdentifierAction.CREATE_IDENTIFIER,
  props<{ createDto: CreateIdentifierDto }>()
);

export const createIdentifierSuccess = createAction(
  CreateIdentifierAction.CREATE_IDENTIFIER_SUCCESS,
  props<{ res: Identifier }>()
);

export const createIdentifierFailure = createAction(
  CreateIdentifierAction.CREATE_IDENTIFIER_FAILURE,
  props<{ error: ErrorResponseDto }>()
);
