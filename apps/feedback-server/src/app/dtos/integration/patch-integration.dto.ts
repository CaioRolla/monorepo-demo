import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

import { PatchIntegrationDto as IPatchIntegrationDto } from '@nui/feedback-shared/core';

export class PatchIntegrationDto implements IPatchIntegrationDto {
  @IsUUID(4)
  id: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc?: string;
}
