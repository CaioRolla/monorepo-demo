import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

// import { SnackBarFacade } from '@nui/shared-app/ui';
import { LoginMerchFacade } from './login-merch.facade';
import * as LoginMerchActions from './login-merch.actions';

@Injectable()
export class LoginMerchEffects {
  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(LoginMerchActions.cTODO),
  //     switchMap(action => {
  //       return this._service.create(action.TODO)
  //         .pipe(
  //           map(res => {
  //             return LoginMerchActions.success({ res });
  //           }),
  //           catchError(error => {
  //             return of(LoginMerchActions.failure({ error }));
  //           })
  //         );
  //     })
  //   );
  // });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(LoginMerchActions.TODO),
  //     tap(action => {
  //       const snackText = this._dyTranslateService.getStatic(
  //         'data-access-login-merch.TODO'
  //       )
  //       this._snackBarFacade.setSuccessSnack(snackText);
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _loginMerchFacade: LoginMerchFacade
  ) {}
}
