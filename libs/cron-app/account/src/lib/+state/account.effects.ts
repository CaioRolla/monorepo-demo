import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, delay, filter } from 'rxjs/operators';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { AccountFacade } from './account.facade';
import * as AccountActions from './account.actions';
import { AuthAppFacade } from '@nui/+auth/app';
import { AccountService } from '@nui/cron-app/application';
import { Router } from '@angular/router';

@Injectable()
export class AccountEffects {
  public readonly loadAccount$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AccountActions.loadAccount),
      switchMap((action) => {
        return this._accountService.getMy().pipe(
          map((res) => {
            return AccountActions.loadAccountSuccess({ res });
          }),
          catchError((error) => {
            return of(AccountActions.loadAccountFailure({ error }));
          })
        );
      })
    );
  });

  public readonly tokenChanged$ = createEffect(() => {
    return this._authAppFacade.token$.pipe(
      map((token) => {
        return token
          ? AccountActions.loadAccount()
          : AccountActions.clearAccount();
      })
    );
  });

  public readonly keepAccountUpdated$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(AccountActions.keepAccountUpdated),
        tap((action) => {
          this._accountFacade.loadAccount();
        })
      );
    },
    { dispatch: false }
  );

  public readonly loadAccountSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(AccountActions.loadAccountSuccess),
        delay(5000),
        concatLatestFrom(() => this._accountFacade.keepAccountUpdated$),
        tap(([action, keepAccountUpdated]) => {
          if (keepAccountUpdated) {
            this._accountFacade.loadAccount();
          }
        })
      );
    },
    { dispatch: false }
  );

  public readonly openStripePortal$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AccountActions.openStripePortal),
      switchMap((action) => {
        return this._accountService.getStripeCustomerPortalURL().pipe(
          map((res) => {
            return AccountActions.openStripePortalSuccess({ url: res.url });
          }),
          catchError((error) => {
            return of(AccountActions.openStripePortalFailure({ error }));
          })
        );
      })
    );
  });

  public readonly openStripePortalSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(AccountActions.openStripePortalSuccess),
        tap((action) => {
          window.location.href = action.url;
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _accountFacade: AccountFacade,
    private readonly _authAppFacade: AuthAppFacade,
    private readonly _accountService: AccountService,
    private readonly _router: Router
  ) {}
}
