import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthAppFacade } from '@nui/+auth/app';

import { combineLatest, Subscription } from 'rxjs';

import { Dialog } from '@nui/shared-app/ui/dialog';
import { HomeFacade } from '../+state/home.facade';
import { SaveScheduleDialogComponent } from '@nui/cron-app/feature-save-schedule';
import { AccountFacade } from '@nui/cron-app/account';
import { AccountPlan } from '@nui/cron-shared/core';
import { planAllowMoreSchedules } from '@nui/cron-shared/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'nui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly AccountPlan = AccountPlan;

  public readonly loadingStats$ = this._homeFacade.loadingStats$;

  public readonly stats$ = this._homeFacade.stats$;

  public readonly statsExecutionsCount$ =
    this._homeFacade.statsExecutionsCount$;

  public readonly statsFailureExecutionsCount$ =
    this._homeFacade.statsFailureExecutionsCount$;

  public readonly statsSuccessExecutionsCount$ =
    this._homeFacade.statsSuccessExecutionsCount$;

  public readonly statsSchedules$ = this._homeFacade.statsSchedules$;

  public readonly statsSchedulesCount$ = this._homeFacade.statsSchedulesCount$;

  public readonly schedulesPage$ = this._homeFacade.schedulesPage$;

  public readonly paginatedSchedules$ = this._homeFacade.paginatedSchedules$;

  public readonly disableNextSchedules$ =
    this._homeFacade.disableNextSchedules$;

  public readonly disablePreviousSchedules$ =
    this._homeFacade.disablePreviousSchedules$;

  public readonly paginatedSchedulesCount$ =
    this._homeFacade.paginatedSchedulesCount$;

  public readonly welcomeMessage$ = this._authAppFacade.welcomeMessage$;

  public readonly account$ = this._accountFacade.account$;

  public readonly planAllowMoreSchedules$ = combineLatest([
    this.account$,
    this.statsSchedulesCount$,
  ]).pipe(
    map(([account, count]) => {
      return account ? planAllowMoreSchedules(account, count) : false;
    })
  );

  constructor(
    private readonly _homeFacade: HomeFacade,
    private readonly _authAppFacade: AuthAppFacade,
    private readonly _dialog: Dialog,
    private readonly _accountFacade: AccountFacade
  ) {}

  public ngOnInit(): void {
    this._homeFacade.loadStats();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._homeFacade.resetState();
  }

  public nextSchedules(): void {
    this._homeFacade.nextSchedules();
  }

  public previousSchedules(): void {
    this._homeFacade.previousSchedules();
  }

  public createScheduleClicked(): void {
    this._dialog
      .create(SaveScheduleDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this._homeFacade.loadStats();
      });
  }

}
