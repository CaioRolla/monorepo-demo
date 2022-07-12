import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CreateIdentifierComponent } from './create-identifier/create-identifier.component';
import * as fromCreateIdentifier from './+state/create-identifier.reducer';
import { CreateIdentifierEffects } from './+state/create-identifier.effects';
import { CreateIdentifierFacade } from './+state/create-identifier.facade';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';
import { CheckboxFieldModule } from '@nui/shared-app/forms/checkbox-field';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(fromCreateIdentifier.FEATURE_KEY, fromCreateIdentifier.reducer),
        EffectsModule.forFeature([CreateIdentifierEffects]),
        SnackbarModule,
        ReactiveFormsModule,
        ButtonModule,
        FormFieldModule,
        CheckboxFieldModule,
    ],
    providers: [CreateIdentifierFacade],
    declarations: [CreateIdentifierComponent],
    exports: [CreateIdentifierComponent]
})
export class FeatureCreateIdentifierModule {}
