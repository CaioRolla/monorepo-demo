import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  switchMap,
  map,
  catchError,
  tap,
  delay,
  filter,
  distinctUntilChanged,
} from 'rxjs/operators';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import _ from 'lodash';

import { AccountFacade } from './account.facade';
import * as AccountActions from './account.actions';
import { AuthAppFacade } from '@nui/+auth/app';
import { AccountService } from '@nui/feedback-app/application';
import { Dialog } from '@nui/shared-app/ui/dialog';
import { StartTrialDialogComponent } from '../dialogs/start-trial-dialog/start-trial-dialog.component';
import { AccountPlan } from '@nui/feedback-shared/core';
import { AccountConfig } from '../account.config';
import { CanceledDialogComponent } from '../dialogs/canceled-dialog/canceled-dialog.component';

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

  public readonly handleAccountDialogs$ = createEffect(
    () => {
      return this._accountFacade.account$.pipe(
        filter((v) => !!v),
        distinctUntilChanged((a, b) => _.isEqual(a, b)),
        filter(v => !window.location.pathname.startsWith('/i/')),
        tap((account) => {
          if ((account?.plan === AccountPlan.UNSET)) {
            this._dialog.create(StartTrialDialogComponent, {
              disposeOnNavigation: false,
              disableClose: true,
            });
          }
          if ((account?.plan === AccountPlan.CANCELED)) {
            this._dialog.create(CanceledDialogComponent, {
              disposeOnNavigation: false,
              disableClose: true,
            });
          }
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
    private readonly _dialog: Dialog,
    private readonly _router: Router,
    private readonly _config: AccountConfig
  ) {}
}
