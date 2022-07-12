import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, delay } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { SetupSurveyFacade } from './setup-survey.facade';
import * as SetupSurveyActions from './setup-survey.actions';
import { SurveyService } from '@nui/feedback-app/application';
import { Router } from '@angular/router';

declare let $localize: any;

@Injectable()
export class SetupSurveyEffects {
  public readonly loadSurvey$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SetupSurveyActions.loadSurvey),
      switchMap((action) => {
        return this._surveyService.get(action.surveyId).pipe(
          map((res) => {
            return SetupSurveyActions.loadSurveySuccess({ res });
          }),
          catchError((error) => {
            return of(SetupSurveyActions.loadSurveyFailure({ error }));
          })
        );
      })
    );
  });

  public readonly setupSurvey$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SetupSurveyActions.setupSurvey),
      switchMap((action) => {
        return this._surveyService.setup(action.setupDto).pipe(
          map((res) => {
            return SetupSurveyActions.setupSurveySuccess({ res });
          }),
          catchError((error) => {
            return of(SetupSurveyActions.setupSurveyFailure({ error }));
          })
        );
      })
    );
  });

  public readonly setupSurveySuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(SetupSurveyActions.setupSurveySuccess),
        tap((action) => {
          this._router.navigate(['/', 'survey-settings', action.res.id], { queryParams: { tabId: 'share' } });
        }),
        delay(200),
        tap(() => {
          const message = $localize`Your survey is ready to rock!`;
          // const icon = '';
          this._snackbar.open({ message });
        })
      );
    },
    { dispatch: false }
  );

  public readonly setupSurveyFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(SetupSurveyActions.setupSurveyFailure),
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
    private readonly _setupSurveyFacade: SetupSurveyFacade,
    private readonly _surveyService: SurveyService,
    private readonly _router: Router,
    private readonly _snackbar: Snackbar
  ) {}
}
