import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthAppConfig } from '../../auth-app.config';
import { ForgotPasswordFacade } from './+state/forgot-password.facade';

@Component({
  selector: 'nui-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  public readonly form = this._initForm();

  public get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  public readonly loading$ = this._forgotPasswordFacade.loading$;

  constructor(
    public readonly config: AuthAppConfig,
    private readonly _fb: FormBuilder,
    private readonly _forgotPasswordFacade: ForgotPasswordFacade
  ) {}

  private _initForm() {
    return this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._forgotPasswordFacade.resendConfirmation(this.form.value);
    }
  }
}
