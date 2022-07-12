import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

import {
  SetupSurveyDto as ISetupSurveyDto, SurveyType,
} from '@nui/feedback-shared/core';

export class SetupSurveyDto implements ISetupSurveyDto {
  @IsUUID(4)
  id: string;

  @IsEnum(SurveyType)
  type: SurveyType;

  @IsBoolean()
  customPrimaryQuestionTitle: boolean;

  @IsBoolean()
  customLogo: boolean;

  @IsOptional()
  @IsString()
  logoBase64?: string;

  @IsOptional()
  @MaxLength(500)
  @IsString()
  primaryQuestionTitle?: string;

  @IsOptional()
  @IsString()
  template?: string;

  @IsBoolean()
  redirectAfterCompleted: boolean;

  @IsOptional()
  @IsUrl()
  redirectAfterCompletedUrl?: string;

  @IsBoolean()
  openQuestionEnabled: boolean;

  @IsOptional()
  openQuestionOptional?: boolean;

  @IsBoolean()
  customOpenQuestionTitle: boolean;

  @IsOptional()
  @MaxLength(500)
  @IsString()
  openQuestionTitle?: string;

  @IsBoolean()
  canAnswerMultipleTimes: boolean;

}
