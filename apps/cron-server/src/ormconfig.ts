import { UserEntity } from '@nui/+auth/server';
import { AccountEntity } from './app/entities/account.entity';
import { ExecutionEntity } from './app/entities/execution.entity';
import { ScheduleEntity } from './app/entities/schedule.entity';
import { UserAccountEntity } from './app/entities/user-account.entity';

export default {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  charset: 'utf8mb4',
  extra: {
    charset: 'utf8mb4',
  },
  entities: [
    UserEntity,
    AccountEntity,
    UserAccountEntity,
    ScheduleEntity,
    ExecutionEntity,
  ],
  migrations:
    process.env.NODE_ENV === 'migration'
      ? [
          __dirname + '/../migration/*{.ts,.js}',
          __dirname + '/../../../libs/+auth/server/migration/*{.ts,.js}',
        ]
      : [],
  cli: {
    migrationsDir: 'apps/cron-server/migration/',
  },
  synchronize: false,
};
