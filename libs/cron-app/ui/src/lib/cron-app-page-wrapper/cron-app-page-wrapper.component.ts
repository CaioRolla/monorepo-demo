import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { AuthAppFacade } from '@nui/+auth/app';
import { AccountFacade } from '@nui/cron-app/account';

@Component({
  selector: 'nui-cron-app-page-wrapper',
  templateUrl: './cron-app-page-wrapper.component.html',
  styleUrls: ['./cron-app-page-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CronAppPageWrapperComponent implements OnInit {
  @Input() pageTitle: string = '';

  constructor(
    public readonly authAppFacade: AuthAppFacade,
    private readonly _accountFacade: AccountFacade
  ) {}

  ngOnInit(): void {}

  public openStripeCustomerPortal(): void {
    this._accountFacade.openStripePortal();
  }
}
