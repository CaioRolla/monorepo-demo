import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Account, AccountPlan } from '@nui/feedback-shared/core';

import { Dialog } from '@nui/shared-app/ui/dialog';
import { AccountFacade } from '../../+state/account.facade';
import { AccountConfig } from '../../account.config';

@Component({
  selector: 'nui-canceled-dialog',
  templateUrl: './canceled-dialog.component.html',
  styleUrls: ['./canceled-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanceledDialogComponent {
  public readonly account$ = this._accountFacade.account$;

  constructor(
    private readonly _config: AccountConfig,
    private readonly _accountFacade: AccountFacade,
    private readonly _dialog: Dialog
  ) {}

  public close(): void {
    this._dialog.close();
  }

  public renewPlan(account: Account): void {
    const url = `${this._config.baseApi}/v1/account/upgrade?plan=${AccountPlan.SCALE_MONTHLY}&accountId=${account.id}`;
    window.location.href = url;
  }
}
