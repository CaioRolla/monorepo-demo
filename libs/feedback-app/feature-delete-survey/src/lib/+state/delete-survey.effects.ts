import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { DeleteSurveyFacade } from './delete-survey.facade';
import * as DeleteSurveyActions from './delete-survey.actions';
import { SurveyService } from '@nui/feedback-app/application';
import { Dialog } from '@nui/shared-app/ui/dialog';

// eslint-disable-next-line no-var
declare let $localize: any;

@Injectable()
export class DeleteSurveyEffects {
  public readonly action$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(DeleteSurveyActions.deleteSurvey),
      switchMap((action) => {
        return this._surveyService.delete(action.surveyId).pipe(
          map((res) => {
            return DeleteSurveyActions.deleteSurveySuccess();
          }),
          catchError((error) => {
            return of(DeleteSurveyActions.deleteSurveyFailure({ error }));
          })
        );
      })
    );
  });

  public readonly deleteSurveySuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(DeleteSurveyActions.deleteSurveySuccess),
        tap((action) => {
          const message = $localize`Survey deleted successfully`;
          const icon = 'check';
          this._snackbar.open({ message, icon });
        }),
        tap(() => {
          this._dialog.close();
        })
      );
    },
    { dispatch: false }
  );

  public readonly deleteSurveyFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(DeleteSurveyActions.deleteSurveyFailure),
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
    private readonly _deleteSurveyFacade: DeleteSurveyFacade,
    private readonly _surveyService: SurveyService,
    private readonly _snackbar: Snackbar,
    private readonly _dialog: Dialog
  ) {}
}
