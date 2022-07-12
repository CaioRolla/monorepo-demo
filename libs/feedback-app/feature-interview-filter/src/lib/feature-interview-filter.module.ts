import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { InterviewFilterComponent } from './interview-filter/interview-filter.component';
import * as fromInterviewFilter from './+state/interview-filter.reducer';
import { InterviewFilterEffects } from './+state/interview-filter.effects';
import { InterviewFilterFacade } from './+state/interview-filter.facade';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import { FormsModule } from '@angular/forms';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';
import { CheckboxFieldModule } from '@nui/shared-app/forms/checkbox-field';
import { FormSectionModule } from '@nui/shared-app/ui/form-section';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { HeroIconsModule } from 'ng-heroicons';
import { CardModule } from '@nui/shared-app/ui/card';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        StoreModule.forFeature(fromInterviewFilter.FEATURE_KEY, fromInterviewFilter.reducer),
        EffectsModule.forFeature([InterviewFilterEffects]),
        SnackbarModule,
        FormsModule,
        FormFieldModule,
        CheckboxFieldModule,
        FormSectionModule,
        ButtonModule,
        HeroIconsModule,
        CardModule,
    ],
    providers: [InterviewFilterFacade],
    declarations: [InterviewFilterComponent],
    exports: [InterviewFilterComponent]
})
export class FeatureInterviewFilterModule {}
