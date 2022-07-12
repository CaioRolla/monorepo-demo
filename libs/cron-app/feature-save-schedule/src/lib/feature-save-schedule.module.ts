import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroIconsModule } from 'ng-heroicons';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'
import { DpDatePickerModule } from 'ng2-date-picker';

import { AuthenticatedGuard } from '@nui/+auth/app';
import { SaveScheduleComponent } from './save-schedule/save-schedule.component';
import * as fromSaveSchedule from './+state/save-schedule.reducer';
import { SaveScheduleEffects } from './+state/save-schedule.effects';
import { SaveScheduleFacade } from './+state/save-schedule.facade';
import { SaveScheduleDialogComponent } from './save-schedule-dialog/save-schedule-dialog.component';
import { CardModule } from '@nui/shared-app/ui/card';
import { ChipModule } from '@nui/shared-app/ui/chip';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';
import { CheckboxFieldModule } from '@nui/shared-app/forms/checkbox-field';
import { LoadingContentModule } from '@nui/shared-app/ui/loading-content';


@NgModule({
    imports: [
        CommonModule,
        NgxMaskModule.forRoot(),
        FormFieldModule,
        ReactiveFormsModule,
        // RouterModule.forChild([
        //   {
        //     path: '',
        //     pathMatch: 'full',
        //     component: SaveScheduleComponent,
        //     canActivate: [AuthenticatedGuard],
        //   },
        // ]),
        StoreModule.forFeature(fromSaveSchedule.FEATURE_KEY, fromSaveSchedule.reducer),
        EffectsModule.forFeature([SaveScheduleEffects]),
        CardModule,
        ButtonModule,
        HeroIconsModule,
        LoadingContentModule,
        CheckboxFieldModule,
        ChipModule,
        DpDatePickerModule
    ],
    providers: [SaveScheduleFacade],
    declarations: [SaveScheduleComponent, SaveScheduleDialogComponent],
    exports: [SaveScheduleComponent, SaveScheduleDialogComponent]
})
export class FeatureSaveScheduleModule {}
