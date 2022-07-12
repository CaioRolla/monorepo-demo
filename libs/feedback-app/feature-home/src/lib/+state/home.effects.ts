import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

// import { SnackBarFacade } from '@nui/shared-app/ui';
import { SurveyService } from '@nui/feedback-app/application';
import { HomeFacade } from './home.facade';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  public readonly loadSurveys$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(HomeActions.loadSurveys),
      switchMap((action) => {
        return this._surveyService.getAll({ take: -1 }).pipe(
          map((res) => {
            return HomeActions.loadSurveysSuccess({ res });
          }),
          catchError((error) => {
            return of(HomeActions.loadSurveysFailure({ error }));
          })
        );
      })
    );
  });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(HomeActions.TODO),
  //     tap(action => {
  //       const snackText = this._dyTranslateService.getStatic(
  //         'data-access-home.TODO'
  //       )
  //       this._snackBarFacade.setSuccessSnack(snackText);
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _homeFacade: HomeFacade,
    private readonly _surveyService: SurveyService
  ) {}
}
