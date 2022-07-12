import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticatedGuard } from '@nui/+auth/app';
import { SetupSurveyComponent } from './setup-survey/setup-survey.component';
import * as fromSetupSurvey from './+state/setup-survey.reducer';
import { SetupSurveyEffects } from './+state/setup-survey.effects';
import { SetupSurveyFacade } from './+state/setup-survey.facade';
import { FeedbackAppPageWrapperModule } from '@nui/feedback-app/ui/feedback-app-page-wrapper';
import { AccountGuard } from '@nui/feedback-app/account';
import { CardModule } from '@nui/shared-app/ui/card';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { CheckboxFieldModule } from '@nui/shared-app/forms/checkbox-field';
import { RadioCardModule } from '@nui/shared-app/forms/radio-card';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';
import { FormSectionModule } from '@nui/shared-app/ui/form-section';
import { BrowserFrameModule } from '@nui/shared-app/ui/browser-frame';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import { FeedbackAppQuestionsModule } from '@nui/feedback-app/questions';
import { ImageUploadModule } from '@nui/shared-app/ui/image-upload';

@NgModule({
    imports: [
        CommonModule,
        FeedbackAppPageWrapperModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: ':surveyId',
                pathMatch: 'full',
                component: SetupSurveyComponent,
                canActivate: [AuthenticatedGuard, AccountGuard],
            },
        ]),
        StoreModule.forFeature(fromSetupSurvey.FEATURE_KEY, fromSetupSurvey.reducer),
        EffectsModule.forFeature([SetupSurveyEffects]),
        CardModule,
        FormFieldModule,
        CheckboxFieldModule,
        RadioCardModule,
        ButtonModule,
        FormSectionModule,
        BrowserFrameModule,
        SnackbarModule,
        FeedbackAppQuestionsModule,
        ImageUploadModule
    ],
    providers: [SetupSurveyFacade],
    declarations: [SetupSurveyComponent],
    exports: [SetupSurveyComponent]
})
export class FeatureSetupSurveyModule {}
