import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

// import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { IntegrationFacade } from './integration.facade';
import * as IntegrationActions from './integration.actions';

declare let $localize: any;

@Injectable()
export class IntegrationEffects {
  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(IntegrationActions.TODO),
  //     switchMap(action => {
  //       return this._service.create(action.TODO)
  //         .pipe(
  //           map(res => {
  //             return IntegrationActions.Success({ res });
  //           }),
  //           catchError(error => {
  //             return of(IntegrationActions.Failure({ error }));
  //           })
  //         );
  //     })
  //   );
  // });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(IntegrationActions.TODO),
  //     tap(action => {
  //       const message = $localize`Working late`;
  //       const icon = 'info';
  //       this._snackbar.open({ message, icon });
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _integrationFacade: IntegrationFacade
  ) // private readonly _snackBar: Snackbar
  {}
}
