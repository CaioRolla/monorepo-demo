import { Account } from './account.entity';
import { IntegrationWebhook } from './integration-webhook.entity';

export interface Integration {
  id: string;

  name: string;

  desc?: string;

  webhooks: IntegrationWebhook[];

  createdAt: Date;

  account: Account;

  updatedAt?: Date;

  deletedAt?: Date;
}
