import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { IdentifierEntity } from '../entities/identifier.entity';

@Injectable()
@EntityRepository(IdentifierEntity)
export class IdentifierRepository extends Repository<IdentifierEntity> {}

export const IdentifierRepositoryProvider = {
  provide: IdentifierRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(IdentifierRepository),
  inject: [Connection],
};
