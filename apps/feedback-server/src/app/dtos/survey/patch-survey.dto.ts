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
  PatchSurveyDto as IPatchSurveyDto, SurveyStatus, SurveyType,
} from '@nui/feedback-shared/core';

export class PatchSurveyDto implements IPatchSurveyDto {
  @IsUUID(4)
  id: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsBoolean()
  customLogo?: boolean;

  @IsOptional()
  @IsString()
  logoBase64?: string;

  @IsOptional()
  @IsEnum(SurveyStatus)
  status?: SurveyStatus;

  @IsOptional()
  @MaxLength(500)
  @IsString()
  primaryQuestionTitle?: string;

  @IsOptional()
  @IsString()
  template?: string;

  @IsOptional()
  @IsBoolean()
  redirectAfterCompleted?: boolean;

  @IsOptional()
  @IsUrl()
  redirectAfterCompletedUrl?: string;

  @IsOptional()
  @IsBoolean()
  openQuestionEnabled: boolean;

  @IsOptional()
  openQuestionOptional?: boolean;

  @IsOptional()
  @MaxLength(500)
  @IsString()
  openQuestionTitle?: string;

  @IsOptional()
  @IsBoolean()
  canAnswerMultipleTimes: boolean;

}
