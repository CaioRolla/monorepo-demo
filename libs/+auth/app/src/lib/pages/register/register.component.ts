import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { CustomValidators } from '@nui/shared-app/forms/validators';
import { AuthAppConfig } from '../../auth-app.config';
import { RegisterFacade } from './+state/register.facade';

@Component({
  selector: 'nui-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public readonly form = this._initForm();

  public get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  public get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  public get confirmPasswordControl(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  public readonly loading$ = this._registerFacade.loading$;

  constructor(
    public readonly config: AuthAppConfig,
    private readonly _fb: FormBuilder,
    private readonly _registerFacade: RegisterFacade
  ) {}

  ngOnInit(): void {}

  private _initForm() {
    return this._fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: CustomValidators.confirmPassword('password', 'confirmPassword')
      }
    );
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._registerFacade.register(this.form.value);
    }
  }
}
