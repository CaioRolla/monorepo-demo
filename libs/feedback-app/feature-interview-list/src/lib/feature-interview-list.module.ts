import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';

import { AuthenticatedGuard } from '@nui/+auth/app';
import { InterviewListComponent } from './interview-list/interview-list.component';
import * as fromInterviewList from './+state/interview-list.reducer';
import { InterviewListEffects } from './+state/interview-list.effects';
import { InterviewListFacade } from './+state/interview-list.facade';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import { FeedbackAppPageWrapperModule } from '@nui/feedback-app/ui/feedback-app-page-wrapper';
import { FeatureInterviewFilterModule } from '@nui/feedback-app/feature-interview-filter';
import { StackedListModule } from '@nui/shared-app/ui/stacked-list';
import { PaginatorModule } from '@nui/shared-app/ui/paginator';
import { PrimaryQuestionAnswerChipModule } from '@nui/feedback-app/ui/primary-question-answer-chip';
import { ChipModule } from '@nui/shared-app/ui/chip';
import { LoadingPlaceholderModule } from '@nui/shared-app/ui/loading-placeholder';
import { AccountGuard } from '@nui/feedback-app/account';

@NgModule({
    imports: [
        CommonModule,
        FeedbackAppPageWrapperModule,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                component: InterviewListComponent,
                canActivate: [AuthenticatedGuard, AccountGuard],
            },
        ]),
        StoreModule.forFeature(fromInterviewList.FEATURE_KEY, fromInterviewList.reducer),
        EffectsModule.forFeature([InterviewListEffects]),
        SnackbarModule,
        FeatureInterviewFilterModule,
        HeroIconsModule,
        StackedListModule,
        PaginatorModule,
        PrimaryQuestionAnswerChipModule,
        ChipModule,
        LoadingPlaceholderModule,
    ],
    providers: [InterviewListFacade],
    declarations: [InterviewListComponent],
    exports: [InterviewListComponent]
})
export class FeatureInterviewListModule {}
