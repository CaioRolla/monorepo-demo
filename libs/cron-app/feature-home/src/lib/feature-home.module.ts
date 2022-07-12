import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';

import { HomeComponent } from './home/home.component';
import { HomeEffects } from './+state/home.effects';
import { AuthenticatedGuard } from '@nui/+auth/app';
import { AccountGuard } from '@nui/cron-app/account';
import * as fromHome from './+state/home.reducer';
import { HomeFacade } from './+state/home.facade';
import { DeltaValueModule } from '@nui/shared-app/ui/delta-value';
import { StatsCardModule } from '@nui/shared-app/ui/stats-card';
import { CronAppPageWrapperModule } from '@nui/cron-app/ui/cron-app-page-wrapper'
import { LoadingPlaceholderModule } from '@nui/shared-app/ui/loading-placeholder';
import { CardModule } from '@nui/shared-app/ui/card';
import { CtaCardModule } from '@nui/shared-app/ui/cta-card';
import { PaginatorModule } from '@nui/shared-app/ui/paginator';
import { StackedListModule } from '@nui/shared-app/ui/stacked-list';
import { SchedulesTableComponent } from './schedules-table/schedules-table.component';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { DialogModule } from '@nui/shared-app/ui/dialog';
import { AlertModule } from '@nui/shared-app/ui/alert';
import { TooltipModule } from '@nui/shared-app/ui/tooltip';
import { FeatureSaveScheduleModule } from '@nui/cron-app/feature-save-schedule';

@NgModule({
    imports: [
        CommonModule,
        CronAppPageWrapperModule,
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
        FeatureSaveScheduleModule,
        DeltaValueModule,
        LoadingPlaceholderModule,
        HeroIconsModule,
        StatsCardModule,
        CardModule,
        StackedListModule,
        PaginatorModule,
        CtaCardModule,
        ButtonModule,
        DialogModule,
        AlertModule,
        TooltipModule
    ],
    providers: [HomeFacade],
    declarations: [HomeComponent, SchedulesTableComponent],
    exports: [HomeComponent]
})
export class FeatureHomeModule {}
