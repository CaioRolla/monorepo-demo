import { DynamicModule, Module } from '@nestjs/common';

import { EmailListService } from './services/email-list.service';
import { SharedServerEmailListConfig } from './shared-email-list.config';

@Module({
  controllers: [],
  providers: [EmailListService],
  exports: [EmailListService],
})
export class SharedServerEmailListModule {
  static forRoot(config: SharedServerEmailListConfig): DynamicModule {
    return {
      module: SharedServerEmailListModule,
      providers: [
        {
          provide: SharedServerEmailListConfig,
          useValue: config,
        },
      ],
    };
  }
}
