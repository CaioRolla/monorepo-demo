import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

// import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { ManageAccountFacade } from './manage-account.facade';
import * as ManageAccountActions from './manage-account.actions';

declare let $localize: any;

@Injectable()
export class ManageAccountEffects {
  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(ManageAccountActions.TODO),
  //     switchMap(action => {
  //       return this._service.create(action.TODO)
  //         .pipe(
  //           map(res => {
  //             return ManageAccountActions.Success({ res });
  //           }),
  //           catchError(error => {
  //             return of(ManageAccountActions.Failure({ error }));
  //           })
  //         );
  //     })
  //   );
  // });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(ManageAccountActions.TODO),
  //     tap(action => {
  //       const message = $localize`Working late`;
  //       const icon = 'info';
  //       this._snackbar.open({ message, icon });
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _manageAccountFacade: ManageAccountFacade
  ) // private readonly _snackBar: Snackbar
  {}
}
