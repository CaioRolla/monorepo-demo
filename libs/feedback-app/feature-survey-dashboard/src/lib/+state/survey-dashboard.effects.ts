import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, filter } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

// import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { SurveyDashboardFacade } from './survey-dashboard.facade';
import * as SurveyDashboardActions from './survey-dashboard.actions';
import { SurveyService } from '@nui/feedback-app/application';
import { GetAllInterviewFilterDto } from '@nui/feedback-shared/core';

// declare let $localize: any;

@Injectable()
export class SurveyDashboardEffects {
  public readonly loadStats$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(SurveyDashboardActions.loadStats),
      switchMap((action) => {
        return this._surveyService.stats({ surveyId: action.surveyId, identifiers: []}).pipe(
          map((res) => {
            return SurveyDashboardActions.loadStatsSuccess({ res });
          }),
          catchError((error) => {
            return of(SurveyDashboardActions.loadStatsFailure({ error }));
          })
        );
      })
    );
  });

  public readonly appliedFilter$ = createEffect(() => {
    return this._surveyDashboardFacade.appliedFilter$.pipe(
      filter(v => !!v),
      switchMap((filter) => {
        return this._surveyService.stats(filter as GetAllInterviewFilterDto).pipe(
          map((res) => {
            return SurveyDashboardActions.loadStatsSuccess({ res });
          }),
          catchError((error) => {
            return of(SurveyDashboardActions.loadStatsFailure({ error }));
          })
        );
      })
    );
  });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(SurveyDashboardActions.TODO),
  //     tap(action => {
  //       const message = $localize`Working late`;
  //       const icon = 'info';
  //       this._snackbar.open({ message, icon });
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _surveyDashboardFacade: SurveyDashboardFacade,
    private readonly _surveyService: SurveyService // private readonly _snackBar: Snackbar
  ) {}
}
