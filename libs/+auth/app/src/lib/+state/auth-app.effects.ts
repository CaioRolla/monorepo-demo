import { Injectable } from '@angular/core';
import { tap, delay, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { AuthAppFacade } from './auth-app.facade';
import * as AuthAppActions from './auth-app.actions';

@Injectable()
export class AuthAppEffects {
  public readonly logout$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(AuthAppActions.logout),
        delay(100),
        tap((action) => {
          this._router.navigate(['/', 'auth', 'sign-in']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _authAppFacade: AuthAppFacade,
    private readonly _router: Router
  ) {}
}
