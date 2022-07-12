import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { IntegrationState } from './integration.reducer';
import * as IntegrationSelectors from './integration.selectors';
import * as IntegrationActions from './integration.actions';

@Injectable()
export class IntegrationFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  constructor(
    private readonly _store: Store<IntegrationState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(IntegrationActions.resetState());
  }
}
