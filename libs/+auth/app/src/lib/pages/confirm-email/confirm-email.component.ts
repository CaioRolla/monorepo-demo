import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthAppConfig } from '../../auth-app.config';
import { ConfirmEmailFacade } from './+state/confirm-email.facade';

@Component({
  selector: 'nui-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnInit {
  public readonly email = this._route.snapshot.params['email'];

  public readonly loading$ = this._confirmEmailFacade.loading$;


  constructor(
    public readonly config: AuthAppConfig,
    private readonly _route: ActivatedRoute,
    private readonly _confirmEmailFacade: ConfirmEmailFacade
  ) {}

  ngOnInit(): void {}


  public resendConfirmation(): void {
    this._confirmEmailFacade.resendConfirmation({ email: this.email })
  }
}
