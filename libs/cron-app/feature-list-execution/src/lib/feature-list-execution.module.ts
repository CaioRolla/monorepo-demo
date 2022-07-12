import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';

import { AuthenticatedGuard } from '@nui/+auth/app';
import { CronAppPageWrapperModule } from '@nui/cron-app/ui/cron-app-page-wrapper'
import { ListExecutionComponent } from './list-execution/list-execution.component';
import * as fromListExecution from './+state/list-execution.reducer';
import { ListExecutionEffects } from './+state/list-execution.effects';
import { ListExecutionFacade } from './+state/list-execution.facade';
import { PaginatorModule } from '@nui/shared-app/ui/paginator';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { ChipModule } from '@nui/shared-app/ui/chip';
import { CardModule } from '@nui/shared-app/ui/card';
import { TooltipModule } from '@nui/shared-app/ui/tooltip';
import { StackedListModule } from '@nui/shared-app/ui/stacked-list';
import { LoadingPlaceholderModule } from '@nui/shared-app/ui/loading-placeholder';

@NgModule({
    imports: [
        CommonModule,
        CronAppPageWrapperModule,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                component: ListExecutionComponent,
                canActivate: [AuthenticatedGuard],
            },
        ]),
        StoreModule.forFeature(fromListExecution.FEATURE_KEY, fromListExecution.reducer),
        EffectsModule.forFeature([ListExecutionEffects]),
        HeroIconsModule,
        CardModule,
        StackedListModule,
        PaginatorModule,
        ButtonModule,
        LoadingPlaceholderModule,
        ChipModule,
        TooltipModule
    ],
    providers: [ListExecutionFacade],
    declarations: [ListExecutionComponent],
    exports: [ListExecutionComponent]
})
export class FeatureListExecutionModule {}
