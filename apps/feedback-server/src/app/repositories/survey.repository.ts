import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { SurveyEntity } from '../entities/survey.entity';

@Injectable()
@EntityRepository(SurveyEntity)
export class SurveyRepository extends Repository<SurveyEntity> {}

export const SurveyRepositoryProvider = {
  provide: SurveyRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(SurveyRepository),
  inject: [Connection],
};
