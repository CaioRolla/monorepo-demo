import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {  ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import * as fromCreateIntegration from './+state/create-integration.reducer';
import { CreateIntegrationEffects } from './+state/create-integration.effects';
import { CreateIntegrationFacade } from './+state/create-integration.facade';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import { DialogModule } from '@nui/shared-app/ui/dialog';
import { CardModule } from '@nui/shared-app/ui/card';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { CreateIntegrationDialogComponent } from './create-integration-dialog/create-integration-dialog.component';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(fromCreateIntegration.FEATURE_KEY, fromCreateIntegration.reducer),
        EffectsModule.forFeature([CreateIntegrationEffects]),
        SnackbarModule,
        ReactiveFormsModule,
        FormFieldModule,
        DialogModule,
        CardModule,
        ButtonModule,
        RouterModule
    ],
    providers: [CreateIntegrationFacade],
    declarations: [
        CreateIntegrationDialogComponent
    ],
    exports: [
        CreateIntegrationDialogComponent
    ]
})
export class FeatureCreateIntegrationModule {}
