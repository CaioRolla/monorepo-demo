import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { CreateIntegrationDto as ICreateIntegrationDto } from '@nui/feedback-shared/core';

export class CreateIntegrationDto implements ICreateIntegrationDto {
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc?: string;
}
