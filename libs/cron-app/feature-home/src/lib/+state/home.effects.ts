import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';


import { AccountService } from '@nui/cron-app/application';
import { HomeFacade } from './home.facade';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  public readonly loadStats$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(HomeActions.loadStats),
      switchMap(action => {
        return this._accountService.getStats()
          .pipe(
            map(res => {
              return HomeActions.loadStatsSuccess({ res });
            }),
            catchError(error => {
              return of(HomeActions.loadStatsFailure({ error }));
            })
          );
      })
    );
  });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(HomeActions.TODO),
  //     tap(action => {
  //       const snackText = this._dyTranslateService.getStatic(
  //         'data-access-home.TODO'
  //       )
  //       this._snackBarFacade.setSuccessSnack(snackText);
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _homeFacade: HomeFacade,
    private readonly _accountService: AccountService
  ) {}
}
