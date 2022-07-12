import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';

import { AuthenticatedGuard } from '@nui/+auth/app';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import * as fromIntegrationList from './+state/integration-list.reducer';
import { IntegrationListEffects } from './+state/integration-list.effects';
import { IntegrationListFacade } from './+state/integration-list.facade';
import { IntegrationListComponent } from './integration-list/integration-list.component';
import { FeedbackAppPageWrapperModule } from '@nui/feedback-app/ui/feedback-app-page-wrapper';
import { AccountGuard } from '@nui/feedback-app/account';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { CardModule } from '@nui/shared-app/ui/card';
import { FeatureCreateIntegrationModule } from '@nui/feedback-app/feature-create-integration';
import { DialogModule } from '@nui/shared-app/ui/dialog';

@NgModule({
    imports: [
        CommonModule,
        FeedbackAppPageWrapperModule,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                component: IntegrationListComponent,
                canActivate: [AuthenticatedGuard, AccountGuard],
            },
        ]),
        StoreModule.forFeature(fromIntegrationList.FEATURE_KEY, fromIntegrationList.reducer),
        EffectsModule.forFeature([IntegrationListEffects]),
        SnackbarModule,
        HeroIconsModule,
        ButtonModule,
        CardModule,
        FeatureCreateIntegrationModule,
        DialogModule
    ],
    providers: [IntegrationListFacade],
    declarations: [IntegrationListComponent],
    exports: [IntegrationListComponent]
})
export class FeatureIntegrationListModule {}
