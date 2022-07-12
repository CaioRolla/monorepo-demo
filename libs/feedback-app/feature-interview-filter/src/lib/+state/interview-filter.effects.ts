import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

// import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { InterviewFilterFacade } from './interview-filter.facade';
import * as InterviewFilterActions from './interview-filter.actions';
import { SurveyService } from '@nui/feedback-app/application';

// declare let $localize: any;

@Injectable()
export class InterviewFilterEffects {
  public readonly loadfilterData$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(InterviewFilterActions.loadfilterData),
      switchMap((action) => {
        return this._surveyService.getFilterData(action.surveyId).pipe(
          map((res) => {
            return InterviewFilterActions.loadfilterDataSuccess({ res });
          }),
          catchError((error) => {
            return of(InterviewFilterActions.loadfilterDataFailure({ error }));
          })
        );
      })
    );
  });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(InterviewFilterActions.TODO),
  //     tap(action => {
  //       const message = $localize`Working late`;
  //       const icon = 'info';
  //       this._snackbar.open({ message, icon });
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _interviewFilterFacade: InterviewFilterFacade,
    private readonly _surveyService: SurveyService // private readonly _snackBar: Snackbar
  ) {}
}
