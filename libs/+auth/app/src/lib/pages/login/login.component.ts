import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import _ from 'lodash';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { AuthAppConfig } from '../../auth-app.config';
import { LoginFacade } from './+state/login.facade';

@Component({
  selector: 'nui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly _subscription = new Subscription();
  public readonly form = this._initForm();

  public readonly loading$ = this._loginFacade.loading$;

  public get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  constructor(
    public readonly config: AuthAppConfig,
    private readonly _fb: FormBuilder,
    private readonly _loginFacade: LoginFacade,
    private readonly _cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this._handleLoginError();
    this._handleErrorRemoval();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _initForm() {
    return this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._loginFacade.login(this.form.value);
    }
  }

  private _handleLoginError(): void {
    const sub = this._loginFacade.error$.subscribe((error) => {
      if (!error) {
        this.emailControl.setErrors(null);
        this.passwordControl.setErrors(null);
      }

      if (error) {
        this.emailControl.setErrors({ failed: error });
        this.passwordControl.setErrors({ failed: error });
      }
    });

    this._subscription.add(sub);
  }

  private _handleErrorRemoval(): void {
    const sub = this.form.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged((a, b) => _.isEqual(a, b))
      )
      .subscribe((value) => {
        if (
          this.emailControl.hasError('failed') ||
          this.passwordControl.hasError('failed')
        ) {
          this.emailControl.setErrors(null);
          this.passwordControl.setErrors(null);
          this.form.updateValueAndValidity();
          this._cd.markForCheck();
        }
      });
    this._subscription.add(sub);
  }
}
