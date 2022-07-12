import { join } from 'path';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ScheduleModule } from '@nestjs/schedule';

import {
  Logger,
  SharedServerLoggingModule,
  SlackLogger,
} from '@nui/shared-server/logging';
import { SharedServerStripeModule } from '@nui/shared-server/stripe';
import { HealthServerModule } from '@nui/health/server';
import { AccountEntity } from './entities/account.entity';
import { InterviewEntity } from './entities/interview.entity';
import { SurveyEntity } from './entities/survey.entity';
import { UserAccountEntity } from './entities/user-account.entity';
import { AccountRepositoryProvider } from './repositories/account.repository';
import { InterviewRepositoryProvider } from './repositories/interview.repository';
import { SurveyRepositoryProvider } from './repositories/survey.repository';
import { UserAccountRepositoryProvider } from './repositories/user-account.repository';
import { AuthServerModule, UserEntity } from '@nui/+auth/server';
import { AccountListener } from './listeners/account.listener';
import { LogListener } from './listeners/log.listener';
import { StripeListener } from './listeners/stripe.listerner';
import { UserListener } from './listeners/user.listener';
import { SurveyController } from './controllers/survey.controller';
import { InterviewController } from './controllers/interview.controller';
import { SurveyService } from './services/survey.service';
import { InterviewService } from './services/interview.service';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { IdentifierValueEntity } from './entities/identifier-value.entity';
import { IdentifierEntity } from './entities/identifier.entity';
import { IdentifierRepositoryProvider } from './repositories/identifier.repository';
import { IdentifierService } from './services/identifier.service';
import { IdentifierController } from './controllers/identifier.controller';
import { SharedServerUploadModule } from '@nui/shared-server/upload';
import { S3Module } from 'nestjs-s3';
import { IntegrationRepositoryProvider } from './repositories/integration.repository';
import { IntegrationEntity } from './entities/integration.entity';
import { IntegrationWebhookEntity } from './entities/integration-webhook.entity';
import { IntegrationWebhookRepositoryProvider } from './repositories/integration-webhook.repository';
import { IntegrationController } from './controllers/integration.controller';
import { IntegrationWebhookController } from './controllers/integration-webhook.controller';
import { IntegrationWebhookService } from './services/integration-webhook.service';
import { IntegrationService } from './services/integration.service';
import { SharedServerBeewModule } from '@nui/shared-server/beew';
import { SurveyListener } from './listeners/survey.listener';
import { BeewListener } from './listeners/beew.listener';
import ormconfig from '../ormconfig';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    HealthServerModule,
    EventEmitterModule.forRoot(),
    AuthServerModule.forRoot({
      userDefaultPermissions: [],
      appName: 'Surveyx',
      appLogo: 'https://app.surveyx.co/en/assets/logo/logo01.png',
      appHost: 'surveyx.co',
      appBasePath: process.env.BASE_APP_PATH,
      baseApi: process.env.BASE_API_PATH,      
    }),
    TypeOrmModule.forRoot(ormconfig),
    SharedServerStripeModule.forRoot({
      secretKey: process.env.STRIPE_SECRET_KEY,
      endpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
      connectEndpointSecret: process.env.STRIPE_CONNECT_ENDPOINT_SECRET,
    }),
    MailerModule.forRoot({
      transport: {
        port: 465,
        host: 'email-smtp.us-east-1.amazonaws.com',
        secure: true,
        auth: {
          user: process.env.AWS_SES_SMTP_USER,
          pass: process.env.AWS_SES_SMTP_PASS,
        },
        debug: true,
      },
      defaults: {
        from: '"Surveyx" <noreply@surveyx.co>',
      },
      preview: true,
      template: {
        dir: join(__dirname, 'email-templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    SharedServerLoggingModule,
    S3Module.forRoot({
      config: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_REGION,
      },
    }),
    SharedServerUploadModule.forRoot({
      s3BucketName: process.env.AWS_S3_BUCKET,
    }),
    SharedServerBeewModule.forRoot({
      apiKey: process.env.BEEW_API_KEY,
    }),
  ],
  controllers: [
    SurveyController,
    InterviewController,
    AccountController,
    IdentifierController,
    IntegrationController,
    IntegrationWebhookController,
  ],
  providers: [
    AccountRepositoryProvider,
    InterviewRepositoryProvider,
    SurveyRepositoryProvider,
    UserAccountRepositoryProvider,
    IdentifierRepositoryProvider,
    IntegrationRepositoryProvider,
    IntegrationWebhookRepositoryProvider,
    AccountListener,
    SurveyListener,
    LogListener,
    StripeListener,
    UserListener,
    SurveyService,
    InterviewService,
    AccountService,
    IdentifierService,
    IntegrationService,
    IntegrationWebhookService,
    BeewListener,
    {
      provide: Logger,
      useValue:
        process.env.NODE_ENV === 'production'
          ? new SlackLogger({
              botToken: process.env.SLACK_BOT_TOKEN,
              logChannelId: process.env.SLACK_BOT_LOG_CHANNEL_ID,
              warnChannelId: process.env.SLACK_BOT_WARN_CHANNEL_ID,
              errorChannelId: process.env.SLACK_BOT_ERROR_CHANNEL_ID,
            })
          : new Logger(),
    },
  ],
})
export class AppModule {}
