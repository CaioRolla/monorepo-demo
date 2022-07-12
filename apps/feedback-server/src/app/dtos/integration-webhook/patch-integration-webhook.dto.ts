import { IsOptional, IsString, IsUrl, IsUUID, MaxLength, MinLength } from 'class-validator';

import { PatchIntegrationWebhookDto as IPatchIntegrationWebhookDto } from '@nui/feedback-shared/core';

export class PatchIntegrationWebhookDto implements IPatchIntegrationWebhookDto {
  @IsUUID(4)
  id: string;

  @IsOptional()
  @IsString()
  event?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  name?: string;
}
