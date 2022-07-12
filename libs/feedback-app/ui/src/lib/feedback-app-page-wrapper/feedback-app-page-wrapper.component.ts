import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { map } from 'rxjs/operators';

import { AuthAppFacade } from '@nui/+auth/app';
import { AccountFacade } from '@nui/feedback-app/account';
import { AccountPlan } from '@nui/feedback-shared/core';
import { UiFacade } from '@nui/shared-app/ui/+state';
import { Dialog } from '@nui/shared-app/ui/dialog';
import { StartTrialDialogComponent } from '@nui/feedback-app/account';

@Component({
  selector: 'nui-feedback-app-page-wrapper',
  templateUrl: './feedback-app-page-wrapper.component.html',
  styleUrls: ['./feedback-app-page-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackAppPageWrapperComponent {
  @Input() pageTitle = '';

  public readonly account$ = this._accountFacade.account$;

  public readonly displayPlanMenu$ = this.account$.pipe(
    map(
      (account) =>
        account &&
        !!account.stripeSubscriptionId &&
        account.plan !== AccountPlan.CANCELED &&
        account.plan !== AccountPlan.UNSET
    )
  );

  public readonly sidebarIsOpen$ = this._uiFacade.sidebarIsOpen$;

  constructor(
    public readonly authAppFacade: AuthAppFacade,
    private readonly _accountFacade: AccountFacade,
    private readonly _uiFacade: UiFacade,
    private readonly _dialog: Dialog
  ) {}

  public openStripeCustomerPortal(): void {
    this._accountFacade.openStripePortal();
  }

  public openStartTrialDialog(): void {
    this._dialog.create(StartTrialDialogComponent, {
      disposeOnNavigation: true,
      disableClose: false,
    });
  }
}
