import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AccountFacade } from '@nui/cron-app/account';
import { Account, AccountPlan, AccountPlanType } from '@nui/cron-shared/core';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'nui-plan-section',
  templateUrl: './plan-section.component.html',
  styleUrls: ['./plan-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanSectionComponent implements OnInit {
  public readonly AccountPlanType = AccountPlanType;

  public readonly AccountPlan = AccountPlan;

  public readonly freeFeatures = [
    {
      type: 'neutral',
      inner: 'Up to <strong>2</strong> schedulers',
    },
    {
      type: 'neutral',
      inner: '<strong>15</strong> requests per month',
    },
    {
      type: 'neutral',
      inner: '<strong>Limited</strong> storage for log',
    },
    {
      type: 'danger',
      inner: 'Failure notification',
    },
    {
      type: 'danger',
      inner: 'Execution priority',
    },
    {
      type: 'success',
      inner: 'Recurring executions',
    },
    {
      type: 'success',
      inner: 'Specific date and time execution',
    },
    {
      type: 'success',
      inner: 'Reliable task execution',
    },
    {
      type: 'danger',
      inner: '24-hour support response time',
    },
  ];

  public readonly developerFeatures = [
    {
      type: 'neutral',
      inner: 'Up to <strong>15</strong> schedulers',
    },
    {
      type: 'neutral',
      inner: '<strong>Unlimited</strong> requests per month',
    },
    {
      type: 'neutral',
      inner: '<strong>Unlimited</strong> storage for log',
    },
    {
      type: 'success',
      inner: 'Failure notification',
    },
    {
      type: 'success',
      inner: 'Execution priority',
    },
    {
      type: 'success',
      inner: 'Recurring executions',
    },
    {
      type: 'success',
      inner: 'Specific date and time execution',
    },
    {
      type: 'success',
      inner: 'Reliable task execution',
    },
    {
      type: 'danger',
      inner: '24-hour support response time',
    },
  ];

  public readonly unlimitedFeatures = [
    {
      type: 'neutral',
      inner: '<strong>Unlimited</strong> schedulers',
    },
    {
      type: 'neutral',
      inner: '<strong>Unlimited</strong> requests per month',
    },
    {
      type: 'neutral',
      inner: '<strong>Unlimited</strong> storage for log',
    },
    {
      type: 'success',
      inner: 'Failure notification',
    },
    {
      type: 'success',
      inner: 'Execution priority',
    },
    {
      type: 'success',
      inner: 'Recurring executions',
    },
    {
      type: 'success',
      inner: 'Specific date and time execution',
    },
    {
      type: 'success',
      inner: 'Reliable task execution',
    },
    {
      type: 'success',
      inner: '24-hour support response time',
    },
  ];

  public readonly account$ = this._accountFacade.account$;

  public readonly acountIsStripe$ = this._accountFacade.acountIsStripe$;

  public readonly acountCanSubscribePlan$ =
    this._accountFacade.acountCanSubscribePlan$;

  public readonly planTypeControl = new FormControl(AccountPlanType.MONTHLY);

  constructor(private readonly _accountFacade: AccountFacade) {}

  ngOnInit(): void {
    this.account$
      .pipe(
        filter((v) => !!v),
        take(1)
      )
      .subscribe((account) => {
        this.planTypeControl.setValue(
          account!.planType || AccountPlanType.MONTHLY
        );
      });
  }

  public openStripeCustomerPortal(): void {
    this._accountFacade.openStripePortal();
  }

  public planClicked(
    account: Account,
    plan: AccountPlan,
    planType: AccountPlanType
  ): void {
    window.location.href = `https://server.beew.io/api/v1/account/upgrade?accountId=${account.id}&plan=${plan}&planType=${planType}`;
  }
}
