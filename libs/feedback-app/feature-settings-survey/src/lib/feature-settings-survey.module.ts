import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticatedGuard } from '@nui/+auth/app';
import { SettingsSurveyComponent } from './settings-survey/settings-survey.component';
import * as fromSettingsSurvey from './+state/settings-survey.reducer';
import { SettingsSurveyEffects } from './+state/settings-survey.effects';
import { SettingsSurveyFacade } from './+state/settings-survey.facade';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import { FeedbackAppPageWrapperModule } from '@nui/feedback-app/ui/feedback-app-page-wrapper';
import { FeatureCreateIdentifierModule } from '@nui/feedback-app/feature-create-identifier';
import { TabsModule } from '@nui/shared-app/ui/tabs';
import { SettingsTabComponent } from './tabs/settings-tab/settings-tab.component';
import { ShareTabComponent } from './tabs/share-tab/share-tab.component';
import { IdFieldTabComponent } from './tabs/id-field-tab/id-field-tab.component';
import { CheckboxFieldModule } from '@nui/shared-app/forms/checkbox-field';
import { RadioCardModule } from '@nui/shared-app/forms/radio-card';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';
import { FormSectionModule } from '@nui/shared-app/ui/form-section';
import { CardModule } from '@nui/shared-app/ui/card';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { StackedListModule } from '@nui/shared-app/ui/stacked-list';
import { PaginatorModule } from '@nui/shared-app/ui/paginator';
import { ImageUploadModule } from '@nui/shared-app/ui/image-upload';
import { ClipboardModule } from '@angular/cdk/clipboard';
// import { FeedbackAppQuestionsModule } from '@nui/feedback-app/questions';

@NgModule({
    imports: [
        CommonModule,
        FeedbackAppPageWrapperModule,
        FeatureCreateIdentifierModule,
        RouterModule.forChild([
            {
                path: ':surveyId',
                pathMatch: 'full',
                component: SettingsSurveyComponent,
                canActivate: [AuthenticatedGuard],
            },
        ]),
        StoreModule.forFeature(fromSettingsSurvey.FEATURE_KEY, fromSettingsSurvey.reducer),
        EffectsModule.forFeature([SettingsSurveyEffects]),
        SnackbarModule,
        HeroIconsModule,
        TabsModule,
        ReactiveFormsModule,
        CardModule,
        FormFieldModule,
        CheckboxFieldModule,
        RadioCardModule,
        ButtonModule,
        FormSectionModule,
        StackedListModule,
        PaginatorModule,
        ImageUploadModule,
        ClipboardModule,
        FormsModule
        // FeedbackAppQuestionsModule
    ],
    providers: [SettingsSurveyFacade],
    declarations: [
        SettingsSurveyComponent,
        SettingsTabComponent,
        ShareTabComponent,
        IdFieldTabComponent,
    ],
    exports: [SettingsSurveyComponent]
})
export class FeatureSettingsSurveyModule {}
