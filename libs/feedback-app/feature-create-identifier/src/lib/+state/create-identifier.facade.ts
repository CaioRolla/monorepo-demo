import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { CreateIdentifierState } from './create-identifier.reducer';
import * as CreateIdentifierSelectors from './create-identifier.selectors';
import * as CreateIdentifierActions from './create-identifier.actions';
import { CreateIdentifierDto } from '@nui/feedback-shared/core';

@Injectable()
export class CreateIdentifierFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly creatingIdentifier$ = this._store.select(
    CreateIdentifierSelectors.selectCreatingIdentifier
  );

  public readonly identifier$ = this._store.select(
    CreateIdentifierSelectors.selectIdentifier
  );

  constructor(
    private readonly _store: Store<CreateIdentifierState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(CreateIdentifierActions.resetState());
  }

  public createIdentifier(createDto: CreateIdentifierDto): void {
    this._store.dispatch(
      CreateIdentifierActions.createIdentifier({ createDto })
    );
  }
}
