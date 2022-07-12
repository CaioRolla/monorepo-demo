import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { CreateSurveyFacade } from './create-survey.facade';
import * as CreateSurveyActions from './create-survey.actions';
import { SurveyService } from '@nui/feedback-app/application';
import { Dialog, NUI_DIALOG_DATA } from '@nui/shared-app/ui/dialog';

declare let $localize: any;

@Injectable()
export class CreateSurveyEffects {
  public readonly createSurvey$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(CreateSurveyActions.createSurvey),
      switchMap((action) => {
        return this._surveyService.create(action.createDto).pipe(
          map((res) => {
            return CreateSurveyActions.createSurveySuccess({ res });
          }),
          catchError((error) => {
            return of(CreateSurveyActions.createSurveyFailure({ error }));
          })
        );
      })
    );
  });

  public readonly createSurveySuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(CreateSurveyActions.createSurveySuccess),
        tap((action) => {
          this._router.navigate(['/survey-setup', action.res.id]);
        }),
        // tap(() => {
        //   const message = $localize`Working late`;
        //   const icon = 'clock';
        //   this._snackbar.open({ message, icon });
        // }),
        tap(() => this._dialog.close())
      );
    },
    { dispatch: false }
  );

  public readonly createSurveyFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(CreateSurveyActions.createSurveyFailure),
        tap((action) => {
          const [message] = action.error.message;
          const icon = 'x';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _createSurveyFacade: CreateSurveyFacade,
    private readonly _surveyService: SurveyService,
    private readonly _router: Router,
    private readonly _dialog: Dialog,
    private readonly _snackbar: Snackbar
  ) {}
}
