import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@nui/shared-app/ui/button';
import { AuthenticatedGuard } from '@nui/+auth/app';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import * as fromManageAccount from './+state/manage-account.reducer';
import { ManageAccountEffects } from './+state/manage-account.effects';
import { ManageAccountFacade } from './+state/manage-account.facade';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import { VerticalNavModule } from '@nui/shared-app/ui/vertical-nav';
import { CronAppPageWrapperModule } from '@nui/cron-app/ui/cron-app-page-wrapper';
import { AccountGuard } from '@nui/cron-app/account';
import { AccountSectionComponent } from './sections/account-section/account-section.component';
import { ApiSectionComponent } from './sections/api-section/api-section.component';
import { PlanSectionComponent } from './sections/plan-section/plan-section.component';
import { SupportSectionComponent } from './sections/support-section/support-section.component';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';
import { CardModule } from '@nui/shared-app/ui/card';

@NgModule({
  imports: [
    CommonModule,
    CronAppPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManageAccountComponent,
        canActivate: [AuthenticatedGuard, AccountGuard],
        children: [
          // {
          //   path: 'account',
          //   component: AccountSectionComponent,
          // },
          {
            path: 'api',
            component: ApiSectionComponent,
          },
          {
            path: 'plan',
            component: PlanSectionComponent,
          },
          {
            path: 'support',
            component: SupportSectionComponent,
          },
          {
            path: '**',
            redirectTo: 'plan',
          },
        ],
      },
    ]),
    StoreModule.forFeature(
      fromManageAccount.FEATURE_KEY,
      fromManageAccount.reducer
    ),
    EffectsModule.forFeature([ManageAccountEffects]),
    SnackbarModule,
    VerticalNavModule,
    HeroIconsModule,
    CardModule,
    ClipboardModule,
    FormFieldModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  providers: [ManageAccountFacade],
  declarations: [
    ManageAccountComponent,
    AccountSectionComponent,
    ApiSectionComponent,
    PlanSectionComponent,
    SupportSectionComponent,
  ],
  entryComponents: [ManageAccountComponent],
  exports: [ManageAccountComponent],
})
export class FeatureManageAccountModule {}
