import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';

import { AuthenticatedGuard } from '@nui/+auth/app';
import { HomeComponent } from './home/home.component';
import * as fromHome from './+state/home.reducer';
import { HomeEffects } from './+state/home.effects';
import { HomeFacade } from './+state/home.facade';
import { CardModule } from '@nui/shared-app/ui/card';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { DialogModule } from '@nui/shared-app/ui/dialog';
import { TooltipModule } from '@nui/shared-app/ui/tooltip';
import { PaginatorModule } from '@nui/shared-app/ui/paginator';
import { EmptyStateModule } from '@nui/shared-app/ui/empty-state';
import { StackedListModule } from '@nui/shared-app/ui/stacked-list';
import { LoadingPlaceholderModule } from '@nui/shared-app/ui/loading-placeholder';
import { FeatureCreateSurveyModule } from '@nui/feedback-app/feature-create-survey';
import { FeedbackAppPageWrapperModule } from '@nui/feedback-app/ui/feedback-app-page-wrapper';
import { AccountGuard } from '@nui/feedback-app/account';
import { CtaCardModule } from '@nui/shared-app/ui/cta-card';
import { FeatureDeleteSurveyModule } from '@nui/feedback-app/feature-delete-survey';
import { ChipModule } from '@nui/shared-app/ui/chip';

@NgModule({
    imports: [
        CommonModule,
        FeedbackAppPageWrapperModule,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                component: HomeComponent,
                canActivate: [AuthenticatedGuard, AccountGuard],
            },
        ]),
        StoreModule.forFeature(fromHome.FEATURE_KEY, fromHome.reducer),
        EffectsModule.forFeature([HomeEffects]),
        CardModule,
        TooltipModule,
        ButtonModule,
        DialogModule,
        StackedListModule,
        PaginatorModule,
        LoadingPlaceholderModule,
        EmptyStateModule,
        HeroIconsModule,
        DialogModule,
        FeatureCreateSurveyModule,
        CtaCardModule,
        FeatureDeleteSurveyModule,
        DialogModule,
        ChipModule
    ],
    providers: [HomeFacade],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})
export class FeatureHomeModule {}
