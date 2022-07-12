import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import {
  CreateSurveyDto as ICreateSurveyDto,
} from '@nui/feedback-shared/core';

export class CreateSurveyDto implements ICreateSurveyDto {
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc?: string;
}
