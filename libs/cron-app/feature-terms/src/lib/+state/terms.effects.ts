import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';


// import { SnackBarFacade } from '@nui/shared-app/ui';
import { TermsFacade } from './terms.facade';
import * as TermsActions from './terms.actions';

@Injectable()
export class TermsEffects {
  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(TermsActions.cTODO),
  //     switchMap(action => {
  //       return this._service.create(action.TODO)
  //         .pipe(
  //           map(res => {
  //             return TermsActions.success({ res });
  //           }),
  //           catchError(error => {
  //             return of(TermsActions.failure({ error }));
  //           })
  //         );
  //     })
  //   );
  // });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(TermsActions.TODO),
  //     tap(action => {
  //       const snackText = this._dyTranslateService.getStatic(
  //         'data-access-terms.TODO'
  //       )
  //       this._snackBarFacade.setSuccessSnack(snackText);
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _termsFacade: TermsFacade
  ) {}
}
