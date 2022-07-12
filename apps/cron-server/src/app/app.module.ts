import { join } from 'path';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';

import {
  Logger,
  SharedServerLoggingModule,
  SlackLogger,
} from '@nui/shared-server/logging';
import { SharedServerStripeModule } from '@nui/shared-server/stripe';
import { AuthServerModule, UserEntity } from '@nui/+auth/server';
import { HealthServerModule } from '@nui/health/server';
import { UserAccountRepositoryProvider } from './repositories/user-account.repository';
import { AccountRepositoryProvider } from './repositories/account.repository';
import { AccountEntity } from './entities/account.entity';
import { UserAccountEntity } from './entities/user-account.entity';
import { AccountController } from './controllers/v1/account.controller';
import { AccountService } from './services/account.service';
import { ExecutionRepositoryProvider } from './repositories/execution.repository';
import { ScheduleRepositoryProvider } from './repositories/schedule.repository';
import { ScheduleEntity } from './entities/schedule.entity';
import { ExecutionEntity } from './entities/execution.entity';
import { ScheduleService } from './services/schedule.service';
import { ExecutionService } from './services/execution.service';
import { ExecutionController } from './controllers/v1/execution.controller';
import { ScheduleController } from './controllers/v1/schedule.controller';
import { LogListener } from './listeners/log.listener';
import { UserListener } from './listeners/user.listener';
import { ScheduleListener } from './listeners/schedule.listener';
import { StripeListener } from './listeners/stripe.listerner';
import { AccountListener } from './listeners/account.listener';
import { ExecutionListener } from './listeners/execution.listener';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RapidAPIAccountInterceptor } from './interceptors/rapid-api-account.interceptor';
import ormconfig from '../ormconfig';
import { EXECUTION_QUEUE } from './app.const';
import { ExecutionProcessor } from './processors/execution.processor';

@Module({
  imports: [
    HttpModule,
    BullModule.forRoot({
      redis: {
        maxRetriesPerRequest: 0,
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: EXECUTION_QUEUE
    }),
    AuthServerModule.forRoot({
      appName: 'Beew',
      appLogo: 'https://app.beew.io/en/assets/logo/icon-app.png',
      appHost: 'beew.io',
      appBasePath: process.env.BASE_APP_PATH,
      baseApi: process.env.BASE_API_PATH,
      userDefaultPermissions: [],
    }),
    HealthServerModule,
    EventEmitterModule.forRoot(),
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
        debug: false,
      },
      defaults: {
        from: '"Beew" <noreply@beew.io>',
      },
      preview: false,
      template: {
        dir: join(__dirname, 'email-templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    SharedServerLoggingModule,
  ],
  controllers: [AccountController, ExecutionController, ScheduleController],
  providers: [
    ExecutionProcessor,
    LogListener,
    UserListener,
    UserAccountRepositoryProvider,
    AccountRepositoryProvider,
    ExecutionRepositoryProvider,
    ScheduleRepositoryProvider,
    AccountService,
    ScheduleService,
    ExecutionService,
    ScheduleListener,
    StripeListener,
    AccountListener,
    ExecutionListener,
    {
      provide: Logger,
      useValue:
        process.env.NODE_ENV === 'production'
          ? new SlackLogger({
              botToken: process.env.SLACK_BOT_TOKEN,
              logChannelId: 'C02HGNBM7CJ',
              warnChannelId: 'C02H23153P1',
              errorChannelId: 'C02H23153P1',
            })
          : new Logger(),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RapidAPIAccountInterceptor,
    },
  ],
})
export class AppModule {}
