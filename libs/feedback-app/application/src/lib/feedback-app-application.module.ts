import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FeedbackAppApplicationConfig } from './feedback-app-application.config';
import { AuthTokenInterceptor } from '@nui/+auth/app';

@NgModule({
  imports: [CommonModule],
})
export class FeedbackAppApplicationModule {
  public static forRoot(
    config: FeedbackAppApplicationConfig
  ): ModuleWithProviders<FeedbackAppApplicationModule> {
    return {
      ngModule: FeedbackAppApplicationModule,
      providers: [
        {
          provide: FeedbackAppApplicationConfig,
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
