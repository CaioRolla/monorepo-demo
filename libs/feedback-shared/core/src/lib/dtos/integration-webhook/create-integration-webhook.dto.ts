export interface CreateIntegrationWebhookDto {
  name: string;

  event: string;

  url: string;

  integrationId: string;
}
