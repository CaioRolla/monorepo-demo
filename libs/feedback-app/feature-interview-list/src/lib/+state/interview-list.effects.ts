import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

// import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { InterviewListFacade } from './interview-list.facade';
import * as InterviewListActions from './interview-list.actions';
import { InterviewService } from '@nui/feedback-app/application';

// declare let $localize: any;

@Injectable()
export class InterviewListEffects {
  public readonly loadInterviews$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(InterviewListActions.loadInterviews),
      switchMap((action) => {
        return this._interviewService.getAll(action.filter).pipe(
          map((res) => {
            return InterviewListActions.loadInterviewsSuccess({ res });
          }),
          catchError((error) => {
            return of(InterviewListActions.loadInterviewsFailure({ error }));
          })
        );
      })
    );
  });

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(InterviewListActions.TODO),
  //     tap(action => {
  //       const message = $localize`Working late`;
  //       const icon = 'info';
  //       this._snackbar.open({ message, icon });
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _interviewListFacade: InterviewListFacade,
    private readonly _interviewService: InterviewService // private readonly _snackBar: Snackbar
  ) {}
}
