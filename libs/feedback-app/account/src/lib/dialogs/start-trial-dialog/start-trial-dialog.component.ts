import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Account, AccountPlan } from '@nui/feedback-shared/core';
import { Dialog } from '@nui/shared-app/ui/dialog';
import { AccountFacade } from '../../+state/account.facade';
import { AccountConfig } from '../../account.config';

@Component({
  selector: 'nui-start-trial-dialog',
  templateUrl: './start-trial-dialog.component.html',
  styleUrls: ['./start-trial-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartTrialDialogComponent {
  public readonly AccountPlan = AccountPlan;

  public readonly plan = new FormControl(AccountPlan.SCALE_MONTHLY, [
    Validators.required,
  ]);

  public readonly account$ = this._accountFacade.account$;

  constructor(
    private readonly _config: AccountConfig,
    private readonly _accountFacade: AccountFacade,
    private readonly _dialog: Dialog
  ) {}

  public close(): void {
    this._dialog.close();
  }

  public onSubmit(account: Account): void {
    const url = `${this._config.baseApi}/v1/account/upgrade?plan=${this.plan.value}&accountId=${account.id}`;
    window.location.href = url;
  }
}
