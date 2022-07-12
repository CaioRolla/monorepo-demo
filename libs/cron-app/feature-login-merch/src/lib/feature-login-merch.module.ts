import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LoginMerchComponent } from './login-merch/login-merch.component';
import * as fromLoginMerch from './+state/login-merch.reducer';
import { LoginMerchEffects } from './+state/login-merch.effects';
import { LoginMerchFacade } from './+state/login-merch.facade';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                component: LoginMerchComponent,
            },
        ]),
        StoreModule.forFeature(fromLoginMerch.FEATURE_KEY, fromLoginMerch.reducer),
        EffectsModule.forFeature([LoginMerchEffects]),
    ],
    providers: [LoginMerchFacade],
    declarations: [LoginMerchComponent],
    exports: [LoginMerchComponent]
})
export class FeatureLoginMerchModule {}
