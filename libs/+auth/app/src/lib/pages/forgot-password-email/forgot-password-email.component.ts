import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthAppConfig } from '../../auth-app.config';
import { ForgotPasswordEmailFacade } from './+state/forgot-password-email.facade';

@Component({
  selector: 'nui-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordEmailComponent implements OnInit {
  public readonly email = this._route.snapshot.params['email'];

  public readonly loading$ = this._forgotPasswordEmailFacade.loading$;

  constructor(
    public readonly config: AuthAppConfig,
    private readonly _route: ActivatedRoute,
    private readonly _forgotPasswordEmailFacade: ForgotPasswordEmailFacade
  ) {}

  ngOnInit(): void {}

  public resendConfirmation(): void {
    this._forgotPasswordEmailFacade.resendConfirmation({ email: this.email });
  }
}
