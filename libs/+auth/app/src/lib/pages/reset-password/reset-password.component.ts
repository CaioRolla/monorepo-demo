import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from '@nui/shared-app/forms/validators';
import { AuthAppConfig } from '../../auth-app.config';
import { ResetPasswordFacade } from './+state/reset-password.facade';

@Component({
  selector: 'nui-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  public readonly confirmationToken =
    this._route.snapshot.params['confirmationToken'];

  public readonly form = this._initForm();

  public readonly loading$ = this._resetPasswordFacade.loading$;

  public get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  public get confirmPasswordControl(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  constructor(
    public readonly config: AuthAppConfig,
    private readonly _fb: FormBuilder,
    private readonly _resetPasswordFacade: ResetPasswordFacade,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  private _initForm() {
    return this._fb.group(
      {
        confirmationToken: [this.confirmationToken, [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: CustomValidators.confirmPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._resetPasswordFacade.reset(this.form.value);
    }
  }
}
