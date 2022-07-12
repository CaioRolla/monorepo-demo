import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { HeroIconsModule } from 'ng-heroicons';


import { FeedbackAppPageWrapperComponent } from './feedback-app-page-wrapper.component';
import { PageWrapperModule } from '@nui/shared-app/ui/page-wrapper';
import { TooltipModule } from '@nui/shared-app/ui/tooltip';
import { DialogModule } from '@nui/shared-app/ui/dialog';
import { ButtonModule } from '@nui/shared-app/ui/button';


@NgModule({
  declarations: [
    FeedbackAppPageWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PageWrapperModule,
    HeroIconsModule,
    TooltipModule,
    DialogModule,
    ButtonModule
  ],
  exports: [
    FeedbackAppPageWrapperComponent
  ]
})
export class FeedbackAppPageWrapperModule { }
