import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';

import { AuthButtonModule } from '@nui/shared-app/ui/auth-button';
import { ButtonModule } from '@nui/shared-app/ui/button';
import { CardModule } from '@nui/shared-app/ui/card';
import { DividedPageWrapperModule } from '@nui/shared-app/ui/divided-page-wrapper';
import { ForgotPasswordComponent } from './forgot-password.component';
import { UnauthenticatedGuard } from '../../guards/unauthenticated.guard';
import * as fromForgotPassword from './+state/forgot-password.reducer';
import { ForgotPasswordEffects } from './+state/forgot-password.effects';
import { ForgotPasswordFacade } from './+state/forgot-password.facade';
import { SnackbarModule } from '@nui/shared-app/ui/snackbar';

@NgModule({
  declarations: [ForgotPasswordComponent],
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
        component: ForgotPasswordComponent,
        canActivate: [UnauthenticatedGuard],
      },
    ]),
    StoreModule.forFeature(fromForgotPassword.FEATURE_KEY, fromForgotPassword.reducer, {}),
    EffectsModule.forFeature([ForgotPasswordEffects]),
    SnackbarModule
  ],
  providers: [ForgotPasswordFacade]
})
export class ForgotPasswordModule {}
