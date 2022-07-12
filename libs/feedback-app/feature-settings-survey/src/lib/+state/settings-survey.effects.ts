import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Snackbar } from '@nui/shared-app/ui/snackbar';
import {
  IdentifierService,
  SurveyService,
} from '@nui/feedback-app/application';
import { SettingsSurveyFacade } from './settings-survey.facade';
import * as SettingsSurveyActions from './settings-survey.actions';

declare let $localize: any;

@Injectable()
export class SettingsSurveyEffects {
  public readonly loadIdentifiers$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SettingsSurveyActions.loadIdentifiers),
      switchMap((action) => {
        return this._identifierService
          .getAll(action.surveyId, { take: -1 })
          .pipe(
            map((res) => {
              return SettingsSurveyActions.loadIdentifiersSuccess({ res });
            }),
            catchError((error) => {
              return of(
                SettingsSurveyActions.loadIdentifiersFailure({ error })
              );
            })
          );
      })
    );
  });

  public readonly loadSurvey$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SettingsSurveyActions.loadSurvey),
      switchMap((action) => {
        return this._surveyService.get(action.surveyId).pipe(
          map((res) => {
            return SettingsSurveyActions.loadSurveySuccess({ res });
          }),
          catchError((error) => {
            return of(SettingsSurveyActions.loadSurveyFailure({ error }));
          })
        );
      })
    );
  });

  public readonly patchSurvey$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SettingsSurveyActions.patchSurvey),
      switchMap((action) => {
        return this._surveyService.patch(action.patchDto).pipe(
          map((res) => {
            return SettingsSurveyActions.patchSurveySuccess({ res });
          }),
          catchError((error) => {
            return of(SettingsSurveyActions.patchSurveyFailure({ error }));
          })
        );
      })
    );
  });

  public readonly setupSurveySuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(SettingsSurveyActions.patchSurveySuccess),
        tap(() => {
          const message = $localize`New settings successfully saved!`;
          const icon = 'check';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  public readonly patchSurveyFailure$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(SettingsSurveyActions.patchSurveyFailure),
        tap((action) => {
          const [message] = action.error.message;
          const icon = 'x';
          this._snackbar.open({ message, icon });
        })
      );
    },
    { dispatch: false }
  );

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(SettingsSurveyActions.TODO),
  //     switchMap(action => {
  //       return this._service.create(action.TODO)
  //         .pipe(
  //           map(res => {
  //             return SettingsSurveyActions.Success({ res });
  //           }),
  //           catchError(error => {
  //             return of(SettingsSurveyActions.Failure({ error }));
  //           })
  //         );
  //     })
  //   );
  // });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(SettingsSurveyActions.TODO),
  //     tap(action => {
  //       const message = $localize`Working late`;
  //       const icon = 'info';
  //       this._snackbar.open({ message, icon });
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _settingsSurveyFacade: SettingsSurveyFacade,
    private readonly _surveyService: SurveyService,
    private readonly _identifierService: IdentifierService,
    private readonly _snackbar: Snackbar // private readonly _snackBar: SnackBar
  ) {}
}
