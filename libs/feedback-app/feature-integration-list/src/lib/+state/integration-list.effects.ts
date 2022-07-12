import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

// import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { IntegrationListFacade } from './integration-list.facade';
import * as IntegrationListActions from './integration-list.actions';

declare let $localize: any;

@Injectable()
export class IntegrationListEffects {
  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(IntegrationListActions.TODO),
  //     switchMap(action => {
  //       return this._service.create(action.TODO)
  //         .pipe(
  //           map(res => {
  //             return IntegrationListActions.Success({ res });
  //           }),
  //           catchError(error => {
  //             return of(IntegrationListActions.Failure({ error }));
  //           })
  //         );
  //     })
  //   );
  // });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(IntegrationListActions.TODO),
  //     tap(action => {
  //       const message = $localize`Working late`;
  //       const icon = 'info';
  //       this._snackbar.open({ message, icon });
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _integrationListFacade: IntegrationListFacade
  ) // private readonly _snackBar: Snackbar
  {}
}
