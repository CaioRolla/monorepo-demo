import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { CreateIntegrationState } from './create-integration.reducer';
import * as CreateIntegrationSelectors from './create-integration.selectors';
import * as CreateIntegrationActions from './create-integration.actions';
import { CreateIntegrationDto } from '@nui/feedback-shared/core';

@Injectable()
export class CreateIntegrationFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly creatingIntegration$ = this._store.select(
    CreateIntegrationSelectors.selectCreatingIntegration
  );

  constructor(
    private readonly _store: Store<CreateIntegrationState>,
    private readonly _actions$: Actions
  ) {}

  public createIntegration(createDto: CreateIntegrationDto): void {
    this._store.dispatch(CreateIntegrationActions.createIntegration({ createDto }));
  }

  public resetState(): void {
    this._store.dispatch(CreateIntegrationActions.resetState());
  }
}
