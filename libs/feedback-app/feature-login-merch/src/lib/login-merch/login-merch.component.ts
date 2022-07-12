import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { LoginMerchFacade } from '../+state/login-merch.facade';

@Component({
  selector: 'nui-login-merch',
  templateUrl: './login-merch.component.html',
  styleUrls: ['./login-merch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginMerchComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  constructor(private readonly _loginMerchFacade: LoginMerchFacade) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._loginMerchFacade.resetState();
  }
}
