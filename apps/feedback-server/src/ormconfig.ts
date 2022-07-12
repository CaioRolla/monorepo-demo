import { UserEntity } from '@nui/+auth/server';
import { AccountEntity } from './app/entities/account.entity';
import { IdentifierValueEntity } from './app/entities/identifier-value.entity';
import { IdentifierEntity } from './app/entities/identifier.entity';
import { IntegrationWebhookEntity } from './app/entities/integration-webhook.entity';
import { IntegrationEntity } from './app/entities/integration.entity';
import { InterviewEntity } from './app/entities/interview.entity';
import { SurveyEntity } from './app/entities/survey.entity';
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
    UserAccountEntity,
    AccountEntity,
    IdentifierValueEntity,
    IdentifierEntity,
    InterviewEntity,
    SurveyEntity,
    IntegrationEntity,
    IntegrationWebhookEntity,
  ],
  migrations:
    process.env.NODE_ENV === 'migration'
      ? [
          __dirname + '/../migration/*{.ts,.js}',
          __dirname + '/../../../libs/+auth/server/migration/*{.ts,.js}',
        ]
      : [],
  cli: {
    migrationsDir: 'apps/feedback-server/migration/',
  },
  synchronize: false,
};
