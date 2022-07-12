import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { IntegrationWebhookEntity } from '../entities/integration-webhook.entity';

@Injectable()
@EntityRepository(IntegrationWebhookEntity)
export class IntegrationWebhookRepository extends Repository<IntegrationWebhookEntity> {}

export const IntegrationWebhookRepositoryProvider = {
  provide: IntegrationWebhookRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(IntegrationWebhookRepository),
  inject: [Connection],
};
