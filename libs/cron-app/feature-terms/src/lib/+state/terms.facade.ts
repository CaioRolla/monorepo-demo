import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { TermsState } from './terms.reducer';
import * as TermsSelectors from './terms.selectors';
import * as TermsActions from './terms.actions';

@Injectable()
export class TermsFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  constructor(
    private readonly _store: Store<TermsState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(TermsActions.resetState());
  }
}
