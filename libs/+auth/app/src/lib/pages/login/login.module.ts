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
import { LoginComponent } from './login.component';
import { UnauthenticatedGuard } from '../../guards/unauthenticated.guard';
import { FormFieldModule } from '@nui/shared-app/forms/form-field';
import * as fromLogin from './+state/login.reducer';
import { LoginEffects } from './+state/login.effects';
import { LoginFacade } from './+state/login.facade';

@NgModule({
  declarations: [LoginComponent],
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
        component: LoginComponent,
        canActivate: [UnauthenticatedGuard],
      },
    ]),
    StoreModule.forFeature(fromLogin.FEATURE_KEY, fromLogin.reducer, {}),
    EffectsModule.forFeature([LoginEffects]),
    SnackbarModule
  ],
  providers: [LoginFacade],
  exports: [LoginComponent],
})
export class LoginModule {}
