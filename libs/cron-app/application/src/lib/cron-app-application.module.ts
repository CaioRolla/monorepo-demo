import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CronAppApplicationConfig } from './cron-app-application.config';
import { AuthTokenInterceptor } from '@nui/+auth/app';

@NgModule({
  imports: [CommonModule],
})
export class CronAppApplicationModule {
  public static forRoot(
    config: CronAppApplicationConfig
  ): ModuleWithProviders<CronAppApplicationModule> {
    return {
      ngModule: CronAppApplicationModule,
      providers: [
        {
          provide: CronAppApplicationConfig,
          useValue: config,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthTokenInterceptor,
          multi: true
        }
      ],
    };
  }
}
