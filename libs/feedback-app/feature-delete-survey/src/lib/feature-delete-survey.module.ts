import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {A11yModule} from '@angular/cdk/a11y';

import * as fromDeleteSurvey from './+state/delete-survey.reducer';
import { DeleteSurveyEffects } from './+state/delete-survey.effects';
import { DeleteSurveyFacade } from './+state/delete-survey.facade';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import { DeleteSurveyDialogComponent } from './delete-survey-dialog/delete-survey-dialog.component';
import { CardModule } from '@nui/shared-app/ui/card';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { DialogModule } from '@nui/shared-app/ui/dialog';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(fromDeleteSurvey.FEATURE_KEY, fromDeleteSurvey.reducer),
        EffectsModule.forFeature([DeleteSurveyEffects]),
        SnackbarModule,
        CardModule,
        ButtonModule,
        DialogModule,
        A11yModule
    ],
    providers: [DeleteSurveyFacade],
    declarations: [DeleteSurveyDialogComponent],
    exports: [DeleteSurveyDialogComponent]
})
export class FeatureDeleteSurveyModule {}
