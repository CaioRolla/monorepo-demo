import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Connection } from 'typeorm';

import { UserAccountEntity } from '../entities/user-account.entity';

@Injectable()
@EntityRepository(UserAccountEntity)
export class UserAccountRepository extends Repository<UserAccountEntity> {}

export const UserAccountRepositoryProvider = {
  provide: UserAccountRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(UserAccountRepository),
  inject: [Connection],
};
