import {  createAction, props } from '@ngrx/store';

import {
  ErrorResponseDto,
  GetAllIdentifierDto,
  GetAllResponseDto,
  PatchSurveyDto,
  Survey,
} from '@nui/feedback-shared/core';

export enum SettingsSurveyAction {
  LOAD_SURVEY = '[feedback-app-feature-settings-survey] Load survey',
  LOAD_SURVEY_SUCCESS = '[feedback-app-feature-settings-survey] Loaded survey successfully',
  LOAD_SURVEY_FAILURE = '[feedback-app-feature-settings-survey] Failed to load survey',

  PATCH_SURVEY = '[feedback-app-feature-settings-survey] Patch survey',
  PATCH_SURVEY_SUCCESS = '[feedback-app-feature-settings-survey] Patch survey successfully',
  PATCH_SURVEY_FAILURE = '[feedback-app-feature-settings-survey] Failed to Patch survey',

  LOAD_IDENTIFIERS = '[feedback-app-feature-settings-survey] Load identifiers',
  LOAD_IDENTIFIERS_SUCCESS = '[feedback-app-feature-settings-survey] Loaded identifiers successfully',
  LOAD_IDENTIFIERS_FAILURE = '[feedback-app-feature-settings-survey] Failed to load identifiers',

  NEXT_IDENTIFIERS_PAGE = `[feedback-app-feature-home] Next identifiers page`,
  PREVIOUS_IDENTIFIERS_PAGE = `[feedback-app-feature-home] Previous identifiers page`,

  RESET_STATE = '[feedback-app-feature-settings-survey] Reset state',
}

export const nextIdentifiersPage = createAction(
  SettingsSurveyAction.NEXT_IDENTIFIERS_PAGE
);

export const previousIdentifiersPage = createAction(
  SettingsSurveyAction.PREVIOUS_IDENTIFIERS_PAGE
);

export const loadIdentifiers = createAction(
  SettingsSurveyAction.LOAD_IDENTIFIERS,
  props<{ surveyId: string }>()
);

export const loadIdentifiersSuccess = createAction(
  SettingsSurveyAction.LOAD_IDENTIFIERS_SUCCESS,
  props<{ res: GetAllResponseDto<GetAllIdentifierDto> }>()
);

export const loadIdentifiersFailure = createAction(
  SettingsSurveyAction.LOAD_IDENTIFIERS_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const loadSurvey = createAction(
  SettingsSurveyAction.LOAD_SURVEY,
  props<{ surveyId: string }>()
);

export const loadSurveySuccess = createAction(
  SettingsSurveyAction.LOAD_SURVEY_SUCCESS,
  props<{ res: Survey }>()
);

export const loadSurveyFailure = createAction(
  SettingsSurveyAction.LOAD_SURVEY_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const patchSurvey = createAction(
  SettingsSurveyAction.PATCH_SURVEY,
  props<{ patchDto: PatchSurveyDto }>()
);

export const patchSurveySuccess = createAction(
  SettingsSurveyAction.PATCH_SURVEY_SUCCESS,
  props<{ res: Survey }>()
);

export const patchSurveyFailure = createAction(
  SettingsSurveyAction.PATCH_SURVEY_FAILURE,
  props<{ error: ErrorResponseDto }>()
);

export const resetState = createAction(SettingsSurveyAction.RESET_STATE);
