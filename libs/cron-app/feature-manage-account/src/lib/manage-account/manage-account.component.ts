import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { ManageAccountFacade } from '../+state/manage-account.facade';

@Component({
  selector: 'nui-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageAccountComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  constructor(private readonly _manageAccountFacade: ManageAccountFacade) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._manageAccountFacade.resetState();
  }
}
