import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthenticatedGuard } from '@nui/+auth/app';
import { IntegrationComponent } from './integration/integration.component';
import * as fromIntegration from './+state/integration.reducer';
import { IntegrationEffects } from './+state/integration.effects';
import { IntegrationFacade } from './+state/integration.facade';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import { FeedbackAppPageWrapperModule } from '@nui/feedback-app/ui/feedback-app-page-wrapper';
import { AccountGuard } from '@nui/feedback-app/account';

@NgModule({
    imports: [
        CommonModule,
        FeedbackAppPageWrapperModule,
        RouterModule.forChild([
            {
                path: ':integrationId',
                pathMatch: 'full',
                component: IntegrationComponent,
                canActivate: [AuthenticatedGuard, AccountGuard],
            },
        ]),
        StoreModule.forFeature(fromIntegration.FEATURE_KEY, fromIntegration.reducer),
        EffectsModule.forFeature([IntegrationEffects]),
        SnackbarModule,
    ],
    providers: [IntegrationFacade],
    declarations: [IntegrationComponent],
    exports: [IntegrationComponent]
})
export class FeatureIntegrationModule {}
