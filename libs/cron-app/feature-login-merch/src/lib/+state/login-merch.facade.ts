import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { LoginMerchState } from './login-merch.reducer';
import * as LoginMerchSelectors from './login-merch.selectors';
import * as LoginMerchActions from './login-merch.actions';

@Injectable()
export class LoginMerchFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  constructor(
    private readonly _store: Store<LoginMerchState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(LoginMerchActions.resetState());
  }
}
