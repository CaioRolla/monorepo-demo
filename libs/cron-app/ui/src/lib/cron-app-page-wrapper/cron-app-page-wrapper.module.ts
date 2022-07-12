import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { HeroIconsModule } from 'ng-heroicons';

import { CronAppPageWrapperComponent } from './cron-app-page-wrapper.component';
import { PageWrapperModule } from '@nui/shared-app/ui/page-wrapper';

@NgModule({
  declarations: [
    CronAppPageWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PageWrapperModule,
    HeroIconsModule
  ],
  exports: [
    CronAppPageWrapperComponent
  ]
})
export class CronAppPageWrapperModule { }
