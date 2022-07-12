import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { ExecutionEntity } from '../entities/execution.entity';

@Injectable()
@EntityRepository(ExecutionEntity)
export class ExecutionRepository extends Repository<ExecutionEntity> {}

export const ExecutionRepositoryProvider = {
  provide: ExecutionRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(ExecutionRepository),
  inject: [Connection],
};
