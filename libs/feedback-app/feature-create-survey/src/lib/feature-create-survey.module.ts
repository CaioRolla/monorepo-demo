import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { CardModule } from '@nui/shared-app/ui/card';
import { ButtonModule } from '@nui/shared-app/ui/button';
import * as fromCreateSurvey from './+state/create-survey.reducer';
import { CreateSurveyEffects } from './+state/create-survey.effects';
import { CreateSurveyFacade } from './+state/create-survey.facade';
import { CreateSurveyDialogComponent } from './create-survey-dialog/create-survey-dialog.component';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StoreModule.forFeature(fromCreateSurvey.FEATURE_KEY, fromCreateSurvey.reducer),
        EffectsModule.forFeature([CreateSurveyEffects]),
        ButtonModule,
        CardModule,
        FormFieldModule,
        SnackbarModule
    ],
    providers: [CreateSurveyFacade],
    declarations: [
        CreateSurveyDialogComponent
    ],
    exports: [
        CreateSurveyDialogComponent
    ]
})
export class FeatureCreateSurveyModule {}
