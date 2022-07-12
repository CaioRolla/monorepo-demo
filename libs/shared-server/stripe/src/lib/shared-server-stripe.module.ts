import { DynamicModule, Module } from '@nestjs/common';
import { StripeHookController } from './controllers/v1/stripe-hook.controller';

import { Stripe } from './services/stripe.service';
import { SharedServerStripeConfig } from './shared-server-stripe.config';

@Module({
  controllers: [StripeHookController],
  providers: [Stripe],
  exports: [Stripe],
})
export class SharedServerStripeModule {
  static forRoot(config: SharedServerStripeConfig): DynamicModule {
    return {
      module: SharedServerStripeModule,
      providers: [
        {
          provide: SharedServerStripeConfig,
          useValue: config,
        },
      ],
    };
  }
}
