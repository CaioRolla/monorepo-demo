import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import { FinishInterviewDto as IFinishInterviewDto } from '@nui/feedback-shared/core';

export class FinishInterviewDto implements IFinishInterviewDto {
  @IsUUID(4)
  interviewId: string;

  @IsNumber()
  primaryQuestionAnswer: number;

  @IsOptional()
  @IsString()
  openQuestionAnswer?: string;
}
