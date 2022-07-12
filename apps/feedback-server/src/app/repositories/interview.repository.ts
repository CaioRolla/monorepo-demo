import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { InterviewEntity } from '../entities/interview.entity';

@Injectable()
@EntityRepository(InterviewEntity)
export class InterviewRepository extends Repository<InterviewEntity> {}

export const InterviewRepositoryProvider = {
  provide: InterviewRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(InterviewRepository),
  inject: [Connection],
};
