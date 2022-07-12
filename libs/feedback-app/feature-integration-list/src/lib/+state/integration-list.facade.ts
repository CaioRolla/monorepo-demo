import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { IntegrationListState } from './integration-list.reducer';
import * as IntegrationListSelectors from './integration-list.selectors';
import * as IntegrationListActions from './integration-list.actions';

@Injectable()
export class IntegrationListFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  constructor(
    private readonly _store: Store<IntegrationListState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(IntegrationListActions.resetState());
  }
}
