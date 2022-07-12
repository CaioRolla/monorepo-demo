import { Integration } from "./integration.entity";

export interface IntegrationWebhook {
  id: string;

  name: string;

  event: string;

  url: string;

  integration: Integration;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}
