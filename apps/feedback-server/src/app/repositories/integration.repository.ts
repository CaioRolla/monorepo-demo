import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { IntegrationEntity } from '../entities/integration.entity';

@Injectable()
@EntityRepository(IntegrationEntity)
export class IntegrationRepository extends Repository<IntegrationEntity> {}

export const IntegrationRepositoryProvider = {
  provide: IntegrationRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(IntegrationRepository),
  inject: [Connection],
};
