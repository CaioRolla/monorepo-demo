import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import * as fromAccount from './+state/account.reducer';
import { AccountEffects } from './+state/account.effects';
import { AccountFacade } from './+state/account.facade';
import { StartTrialDialogComponent } from './dialogs/start-trial-dialog/start-trial-dialog.component';
import { DialogModule } from '@nui/shared-app/ui/dialog';
import { RadioCardModule } from '@nui/shared-app/forms/radio-card';
import { CardModule } from '@nui/shared-app/ui/card';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { AccountConfig } from './account.config';
import { CanceledDialogComponent } from './dialogs/canceled-dialog/canceled-dialog.component';
import { HeroIconsModule } from 'ng-heroicons';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(fromAccount.FEATURE_KEY, fromAccount.reducer),
        EffectsModule.forFeature([AccountEffects]),
        ReactiveFormsModule,
        DialogModule,
        RadioCardModule,
        CardModule,
        ButtonModule,
        HeroIconsModule
    ],
    providers: [AccountFacade],
    declarations: [StartTrialDialogComponent, CanceledDialogComponent]
})
export class AccountModule {
  public static forRoot(
    config: AccountConfig
  ): ModuleWithProviders<AccountModule> {
    return {
      ngModule: AccountModule,
      providers: [
        {
          provide: AccountConfig,
          useValue: config,
        },
      ],
    };
  }
}
