import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, delay } from 'rxjs/operators';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';

// import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { InterviewFacade } from './interview.facade';
import * as InterviewActions from './interview.actions';
import { InterviewService } from '@nui/feedback-app/application';

declare let $localize: any;

@Injectable()
export class InterviewEffects {
  public readonly startInterview$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(InterviewActions.startInterview),
      switchMap((action) => {
        return this._interviewService.start(action.startDto).pipe(
          map((res) => {
            return InterviewActions.startInterviewSuccess({ res });
          }),
          catchError((error) => {
            return of(InterviewActions.startInterviewFailure({ error }));
          })
        );
      })
    );
  });

  public readonly finishInterview$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(InterviewActions.finishInterview),
      concatLatestFrom(() => [
        this._interviewFacade.startRes$,
        this._interviewFacade.primaryQuestionAnswer$,
        this._interviewFacade.openQuestionAnswer$,
      ]),
      switchMap(([, startRes, primaryQuestionAnswer, openQuestionAnswer]) => {
        return this._interviewService
          .finish({
            interviewId: startRes?.interviewId as string,
            primaryQuestionAnswer: primaryQuestionAnswer as number,
            openQuestionAnswer: openQuestionAnswer as string,
          })
          .pipe(
            map((res) => {
              return InterviewActions.finishInterviewSuccess({ res });
            }),
            catchError((error) => {
              return of(InterviewActions.finishInterviewFailure({ error }));
            })
          );
      })
    );
  });

  public readonly startInterviewSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(InterviewActions.startInterviewSuccess),
        concatLatestFrom(() => [this._interviewFacade.primaryQuestionAnswer$]),
        tap(([action, primaryQuestionAnswer]) => {
          if (
            !action.res.openQuestionEnabled &&
            primaryQuestionAnswer !== undefined
          ) {
            this._interviewFacade.finishInterview();
          }
        })
      );
    },
    { dispatch: false }
  );

  public readonly answerPrimaryQuestion$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(InterviewActions.answerPrimaryQuestion),
        concatLatestFrom(() => [this._interviewFacade.startRes$]),
        tap(([action, startRes]) => {
          if (!startRes?.openQuestionEnabled) {
            this._interviewFacade.finishInterview();
          }
        })
      );
    },
    { dispatch: false }
  );

  public readonly finishInterviewSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(InterviewActions.finishInterviewSuccess),
        concatLatestFrom(() => [this._interviewFacade.startRes$]),
        delay(1000),
        tap(([action, startRes]) => {
          if (
            startRes?.redirectAfterCompleted &&
            startRes?.redirectAfterCompletedUrl
          ) {
            window.location.href = startRes?.redirectAfterCompletedUrl;
          }
        })
      );
    },
    { dispatch: false }
  );

  // public readonly action$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(InterviewActions.TODO),
  //     tap(action => {
  //       const message = $localize`Working late`;
  //       const icon = 'info';
  //       this._snackbar.open({ message, icon });
  //     }),
  //   );
  // }, { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _interviewFacade: InterviewFacade,
    private readonly _interviewService: InterviewService
  ) {}
}
