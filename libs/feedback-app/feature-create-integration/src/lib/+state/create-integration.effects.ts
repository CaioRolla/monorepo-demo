import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, delay } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

// import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { CreateIntegrationFacade } from './create-integration.facade';
import * as CreateIntegrationActions from './create-integration.actions';
import { IntegrationService } from '@nui/feedback-app/application';
import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { Router } from '@angular/router';
import { Dialog } from '@nui/shared-app/ui/dialog';

// eslint-disable-next-line no-var
declare let $localize: any;

@Injectable()
export class CreateIntegrationEffects {
  public readonly createIntegration$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(CreateIntegrationActions.createIntegration),
      switchMap((action) => {
        return this._integrationService.create(action.createDto).pipe(
          map((res) => {
            return CreateIntegrationActions.createIntegrationSuccess({ res });
          }),
          catchError((error) => {
            return of(
              CreateIntegrationActions.createIntegrationFailure({ error })
            );
          })
        );
      })
    );
  });

  public readonly createIntegrationSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(CreateIntegrationActions.createIntegrationSuccess),
      tap(() => this._dialog.close()),
      tap((action) => {
        this._router.navigate(['/', 'integration', action.res.id]);
      }),
      delay(200),
      tap(action => {
        const message = $localize`Integration created successfully!`;
        const icon = 'check';
        this._snackbar.open({ message, icon });
      }),
    );
  }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _createIntegrationFacade: CreateIntegrationFacade,
    private readonly _integrationService: IntegrationService,
    private readonly _snackbar: Snackbar,
    private readonly _router: Router,
    private readonly _dialog: Dialog
  ) {}
}
