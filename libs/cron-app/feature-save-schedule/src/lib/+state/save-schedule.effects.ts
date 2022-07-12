import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

// import { SnackBarFacade } from '@nui/shared-app/ui';
import { SaveScheduleFacade } from './save-schedule.facade';
import * as SaveScheduleActions from './save-schedule.actions';
import { ScheduleService } from '@nui/cron-app/application';
import { Dialog } from '@nui/shared-app/ui/dialog';

@Injectable()
export class SaveScheduleEffects {
  public readonly loadSchedule$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SaveScheduleActions.loadSchedule),
      switchMap((action) => {
        return this._scheduleService.get(action.scheduleId).pipe(
          map((schedule) => {
            return SaveScheduleActions.loadScheduleSuccess({ schedule });
          }),
          catchError((error) => {
            return of(SaveScheduleActions.loadScheduleFailure({ error }));
          })
        );
      })
    );
  });

  public readonly patchSchedule$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SaveScheduleActions.patchSchedule),
      switchMap((action) => {
        return this._scheduleService.patch(action.saveDto).pipe(
          map((schedule) => {
            return SaveScheduleActions.saveScheduleSuccess({ schedule });
          }),
          catchError((error) => {
            return of(SaveScheduleActions.saveScheduleFailure({ error }));
          })
        );
      })
    );
  });

  public readonly createSchedule$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SaveScheduleActions.createSchedule),
      switchMap((action) => {
        return this._scheduleService.create(action.saveDto).pipe(
          map((schedule) => {
            return SaveScheduleActions.saveScheduleSuccess({ schedule });
          }),
          catchError((error) => {
            return of(SaveScheduleActions.saveScheduleFailure({ error }));
          })
        );
      })
    );
  });

  public readonly saveScheduleSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(SaveScheduleActions.saveScheduleSuccess),
        tap((action) => {
          this._dialog.close();
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _saveScheduleFacade: SaveScheduleFacade,
    private readonly _scheduleService: ScheduleService,
    private readonly _dialog: Dialog
  ) {}
}
