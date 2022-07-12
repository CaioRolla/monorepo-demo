import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SnackbarModule } from '@nui/shared-app/ui/snackbar';
import { AuthButtonModule } from '@nui/shared-app/ui/auth-button';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { CardModule } from '@nui/shared-app/ui/card';
import { DividedPageWrapperModule } from '@nui/shared-app/ui/divided-page-wrapper';
import { RegisterComponent } from './register.component';
import { UnauthenticatedGuard } from '../../guards/unauthenticated.guard';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';
import * as fromRegister from './+state/register.reducer';
import { RegisterEffects } from './+state/register.effects';
import { RegisterFacade } from './+state/register.facade';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    AuthButtonModule,
    DividedPageWrapperModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    FormFieldModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent,
        canActivate: [UnauthenticatedGuard],
      },
    ]),
    StoreModule.forFeature(fromRegister.FEATURE_KEY, fromRegister.reducer, {}),
    EffectsModule.forFeature([RegisterEffects]),
    SnackbarModule
  ],
  providers: [RegisterFacade],
  exports: [RegisterComponent],
})
export class RegisterModule {}
