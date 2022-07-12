import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';

import { AuthenticatedGuard } from '@nui/+auth/app';
import { SurveyDashboardComponent } from './survey-dashboard/survey-dashboard.component';
import * as fromSurveyDashboard from './+state/survey-dashboard.reducer';
import { SurveyDashboardEffects } from './+state/survey-dashboard.effects';
import { SurveyDashboardFacade } from './+state/survey-dashboard.facade';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import { FeedbackAppPageWrapperModule } from '@nui/feedback-app/ui/feedback-app-page-wrapper';
import { CtaCardModule } from '@nui/shared-app/ui/cta-card';
import { StatsCardModule } from '@nui/shared-app/ui/stats-card';
import { ProgressModule } from '@nui/shared-app/ui/progress';
import { ProgressStatsCardModule } from '@nui/shared-app/ui/progress-stats-card';
import { LoadStatsResolver } from './resolvers/load-stats.resolver';
import { StackedListModule } from '@nui/shared-app/ui/stacked-list';
import { FeatureInterviewFilterModule } from '@nui/feedback-app/feature-interview-filter';
import { PrimaryQuestionAnswerChipModule } from '@nui/feedback-app/ui/primary-question-answer-chip';
import { AverageLikePipe } from './pipes/average-like.pipe';
import { AverageCSATPipe } from './pipes/average-csat.pipe';
import { ChipModule } from '@nui/shared-app/ui/chip';

@NgModule({
    imports: [
        CommonModule,
        FeedbackAppPageWrapperModule,
        RouterModule.forChild([
            {
                path: ':surveyId',
                pathMatch: 'full',
                component: SurveyDashboardComponent,
                canActivate: [AuthenticatedGuard],
                resolve: {
                    loadStats: LoadStatsResolver,
                },
            },
        ]),
        StoreModule.forFeature(fromSurveyDashboard.FEATURE_KEY, fromSurveyDashboard.reducer),
        EffectsModule.forFeature([SurveyDashboardEffects]),
        SnackbarModule,
        CtaCardModule,
        StatsCardModule,
        HeroIconsModule,
        ProgressModule,
        ProgressStatsCardModule,
        StackedListModule,
        FeatureInterviewFilterModule,
        PrimaryQuestionAnswerChipModule,
    ],
    providers: [SurveyDashboardFacade, LoadStatsResolver, AverageLikePipe],
    declarations: [SurveyDashboardComponent, AverageLikePipe, AverageCSATPipe],
    exports: [SurveyDashboardComponent]
})
export class FeatureSurveyDashboardModule {}
