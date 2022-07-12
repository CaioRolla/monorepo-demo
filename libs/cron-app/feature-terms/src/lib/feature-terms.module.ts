import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CardModule } from '@nui/shared-app/ui/card';
import * as fromTerms from './+state/terms.reducer';
import { TermsEffects } from './+state/terms.effects';
import { TermsFacade } from './+state/terms.facade';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'privacy-policy',
                pathMatch: 'full',
                component: PrivacyPolicyComponent,
            },
            {
                path: 'terms-of-service',
                pathMatch: 'full',
                component: TermsOfServiceComponent,
            },
            {
                path: '**',
                redirectTo: 'privacy-policy',
            }
        ]),
        StoreModule.forFeature(fromTerms.FEATURE_KEY, fromTerms.reducer),
        EffectsModule.forFeature([TermsEffects]),
        CardModule
    ],
    providers: [TermsFacade],
    declarations: [PrivacyPolicyComponent, TermsOfServiceComponent],
    exports: [TermsOfServiceComponent]
})
export class FeatureTermsModule {}
