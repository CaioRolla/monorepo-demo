import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { AccountState } from './account.reducer';
import * as AccountSelectors from './account.selectors';
import * as AccountActions from './account.actions';

@Injectable()
export class AccountFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loadingAccount$ = this._store.select(
    AccountSelectors.selectLoadingAccount
  );

  public readonly loadAccountError$ = this._store.select(
    AccountSelectors.selectLoadAccountError
  );

  public readonly account$ = this._store.select(AccountSelectors.selectAccount);

  public readonly keepAccountUpdated$ = this._store.select(
    AccountSelectors.selectKeepAccountUpdated
  );

  public readonly limitedMode$ = this._store.select(
    AccountSelectors.selectLimitedMode
  );

  constructor(
    private readonly _store: Store<AccountState>,
    private readonly _actions$: Actions
  ) {}

  public loadAccount(): void {
    this._store.dispatch(AccountActions.loadAccount());
  }

  public openStripePortal(): void {
    this._store.dispatch(AccountActions.openStripePortal());
  }

  public keepAccountUpdated(): void {
    this._store.dispatch(AccountActions.keepAccountUpdated());
  }

  public stopKeepingAccountUpdated(): void {
    this._store.dispatch(AccountActions.stopKeepingAccountUpdated());
  }
}
