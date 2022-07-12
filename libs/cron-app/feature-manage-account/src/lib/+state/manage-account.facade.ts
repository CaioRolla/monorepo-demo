import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { ManageAccountState } from './manage-account.reducer';
import * as ManageAccountSelectors from './manage-account.selectors';
import * as ManageAccountActions from './manage-account.actions';

@Injectable()
export class ManageAccountFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  constructor(
    private readonly _store: Store<ManageAccountState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(ManageAccountActions.resetState());
  }
}
