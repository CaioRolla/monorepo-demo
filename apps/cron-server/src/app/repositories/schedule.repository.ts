import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { ScheduleEntity } from '../entities/schedule.entity';

@Injectable()
@EntityRepository(ScheduleEntity)
export class ScheduleRepository extends Repository<ScheduleEntity> {}

export const ScheduleRepositoryProvider = {
  provide: ScheduleRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(ScheduleRepository),
  inject: [Connection],
};
