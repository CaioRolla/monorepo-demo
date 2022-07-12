import { IsString, IsUrl, IsUUID, MaxLength, MinLength } from 'class-validator';

import { CreateIntegrationWebhookDto as ICreateIntegrationWebhookDto } from '@nui/feedback-shared/core';

export class CreateIntegrationWebhookDto
  implements ICreateIntegrationWebhookDto
{
  @IsString()
  event: string;

  @IsUrl()
  url: string;

  @IsUUID(4)
  integrationId: string;

  @MaxLength(255)
  @MinLength(1)
  @IsString()
  name: string;
}
