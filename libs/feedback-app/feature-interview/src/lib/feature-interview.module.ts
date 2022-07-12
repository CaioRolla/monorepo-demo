import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { InterviewComponent } from './interview/interview.component';
import * as fromInterview from './+state/interview.reducer';
import { InterviewEffects } from './+state/interview.effects';
import { InterviewFacade } from './+state/interview.facade';
import { StartInterviewResolver } from './resolvers/start-interview.resolver';
import { FeedbackAppQuestionsModule } from '@nui/feedback-app/questions';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { HeroIconsModule } from 'ng-heroicons';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';
import { TooltipModule } from '@nui/shared-app/ui/tooltip';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: ':surveyId',
                pathMatch: 'full',
                component: InterviewComponent,
                resolve: {
                    startInterview: StartInterviewResolver,
                },
            },
        ]),
        StoreModule.forFeature(fromInterview.FEATURE_KEY, fromInterview.reducer),
        EffectsModule.forFeature([InterviewEffects]),
        FeedbackAppQuestionsModule,
        ReactiveFormsModule,
        ButtonModule,
        HeroIconsModule,
        FormFieldModule,
        TooltipModule,
    ],
    providers: [InterviewFacade, StartInterviewResolver],
    declarations: [InterviewComponent],
    exports: [InterviewComponent]
})
export class FeatureInterviewModule {}
