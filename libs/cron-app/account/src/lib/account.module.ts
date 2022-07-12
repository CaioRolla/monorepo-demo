import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromAccount from './+state/account.reducer';
import { AccountEffects } from './+state/account.effects';
import { AccountFacade } from './+state/account.facade';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(fromAccount.FEATURE_KEY, fromAccount.reducer),
        EffectsModule.forFeature([AccountEffects]),
    ],
    providers: [AccountFacade],
    declarations: []
})
export class AccountModule {}
