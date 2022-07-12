import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { SaveScheduleState } from './save-schedule.reducer';
import * as SaveScheduleSelectors from './save-schedule.selectors';
import * as SaveScheduleActions from './save-schedule.actions';
import { CreateScheduleDto, PatchScheduleDto } from '@nui/cron-shared/core';

@Injectable()
export class SaveScheduleFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly schedule$ = this._store.select(
    SaveScheduleSelectors.selectSchedule
  );

  public readonly loadingSchedule$ = this._store.select(
    SaveScheduleSelectors.selectLoadingSchedule
  );

  public readonly loadScheduleError$ = this._store.select(
    SaveScheduleSelectors.selectLoadScheduleError
  );

  public readonly savingSchedule$ = this._store.select(
    SaveScheduleSelectors.selectSavingSchedule
  );

  public readonly saveScheduleError$ = this._store.select(
    SaveScheduleSelectors.selectSaveScheduleError
  );

  constructor(
    private readonly _store: Store<SaveScheduleState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(SaveScheduleActions.resetState());
  }

  public loadSchedule(scheduleId: string): void {
    this._store.dispatch(SaveScheduleActions.loadSchedule({ scheduleId }));
  }

  public createSchedule(saveDto: CreateScheduleDto): void {
    this._store.dispatch(SaveScheduleActions.createSchedule({ saveDto }));
  }

  public patchSchedule(saveDto: PatchScheduleDto): void {
    this._store.dispatch(SaveScheduleActions.patchSchedule({ saveDto }));
  }
}
