import {
  IsNumber,
  IsOptional,
  IsUrl,
  IsUUID,
} from 'class-validator';

import { StartInterviewDto as IStartInterviewDto } from '@nui/feedback-shared/core';

export class StartInterviewDto implements IStartInterviewDto {
  @IsUUID(4)
  surveyId: string;

  @IsUrl({ require_tld: false })
  url: string;

  @IsOptional()
  @IsNumber()
  primaryQuestionAnswer?: number;
}
