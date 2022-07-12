import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { CreateIdentifierFacade } from './create-identifier.facade';
import * as CreateIdentifierActions from './create-identifier.actions';
import { IdentifierService } from '@nui/feedback-app/application';

declare let $localize: any;

@Injectable()
export class CreateIdentifierEffects {
  public readonly createIdentifier$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(CreateIdentifierActions.createIdentifier),
      switchMap((action) => {
        return this._identifierService.create(action.createDto).pipe(
          map((res) => {
            return CreateIdentifierActions.createIdentifierSuccess({ res });
          }),
          catchError((error) => {
            return of(
              CreateIdentifierActions.createIdentifierFailure({ error })
            );
          })
        );
      })
    );
  });

  public readonly createIdentifierSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(CreateIdentifierActions.createIdentifierSuccess),
        tap((action) => {
          const message = $localize`Identifier created successfully!`;
          const icon = 'check';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  public readonly createIdentifierFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(CreateIdentifierActions.createIdentifierFailure),
        tap((action) => {
          const [message] = action.error.message;
          const icon = 'exclamation';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _createIdentifierFacade: CreateIdentifierFacade,
    private readonly _snackbar: Snackbar,
    private readonly _identifierService: IdentifierService
  ) {}
}
