import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { SaveScheduleDialogComponent } from '@nui/cron-app/feature-save-schedule';
import { ExecutionStatus, ScheduleStatus } from '@nui/cron-shared/core';
import { Dialog } from '@nui/shared-app/ui/dialog';
import { Subscription } from 'rxjs';

import { HomeFacade } from '../+state/home.facade';

@Component({
  selector: 'nui-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulesTableComponent implements OnDestroy, OnInit {
  public readonly ScheduleStatus = ScheduleStatus;

  public readonly ExecutionStatus = ExecutionStatus;

  private readonly _subscriptions = new Subscription();

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

  public readonly displayEmptyMessage$ = this._homeFacade.displayEmptyMessage$;

  constructor(
    private readonly _dialog: Dialog,
    private readonly _homeFacade: HomeFacade
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public nextSchedules(): void {
    this._homeFacade.nextSchedules();
  }

  public previousSchedules(): void {
    this._homeFacade.previousSchedules();
  }

  public editScheduleClicked(scheduleId: string): void {
    this._dialog
      .create(SaveScheduleDialogComponent, {
        data: {
          scheduleId,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this._homeFacade.loadStats();
      });
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
