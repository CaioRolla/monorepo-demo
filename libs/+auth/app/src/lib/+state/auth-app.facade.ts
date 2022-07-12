import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import * as AuthAppSelectors from './auth-app.selectors';
import { AuthAppState } from './auth-app.reducer';
import * as AuthAppActions from './auth-app.actions';

@Injectable()
export class AuthAppFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly token$ = this._store.select(AuthAppSelectors.selectToken);

  public readonly user$ = this._store.select(AuthAppSelectors.selectUser);
  
  public readonly apiKey$ = this._store.select(AuthAppSelectors.selectApiKey);

  public readonly welcomeMessage$ = this._store.select(AuthAppSelectors.selectWelcomeMessage);

  constructor(
    private readonly _store: Store<AuthAppState>,
    private readonly _actions$: Actions
  ) {}

  public setToken(token: string): void {
    this._store.dispatch(AuthAppActions.setToken({ token }));
  }

  public logout(): void {
    this._store.dispatch(AuthAppActions.logout());
  }
}
