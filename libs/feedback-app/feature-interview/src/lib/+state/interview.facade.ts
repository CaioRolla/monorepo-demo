import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { InterviewState } from './interview.reducer';
import * as InterviewSelectors from './interview.selectors';
import * as InterviewActions from './interview.actions';
import {
  FinishInterviewDto,
  StartInterviewDto,
} from '@nui/feedback-shared/core';

@Injectable()
export class InterviewFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly starting$ = this._store.select(
    InterviewSelectors.selectStarting
  );

  public readonly startError$ = this._store.select(
    InterviewSelectors.selectStartError
  );

  public readonly startRes$ = this._store.select(
    InterviewSelectors.selectStartRes
  );

  public readonly finishing$ = this._store.select(
    InterviewSelectors.selectFinishing
  );

  public readonly finishError$ = this._store.select(
    InterviewSelectors.selectFinishError
  );

  public readonly finishRes$ = this._store.select(
    InterviewSelectors.selectFinishRes
  );

  public readonly primaryQuestionAnswer$ = this._store.select(
    InterviewSelectors.selectPrimaryQuestionAnswer
  );

  public readonly currentQuestionIndex$ = this._store.select(
    InterviewSelectors.selectCurrentQuestionIndex
  );

  public readonly disablePrevious$ = this._store.select(
    InterviewSelectors.selectDisablePrevious
  );

  public readonly openQuestionAnswer$ = this._store.select(
    InterviewSelectors.selectOpenQuestionAnswer
  );

  public readonly disableNext$ = this._store.select(
    InterviewSelectors.selectDisableNext
  );

  public readonly openQuestionEnabled$ = this._store.select(
    InterviewSelectors.selectOpenQuestionEnabled
  );

  public readonly redirectAfterCompleted$ = this._store.select(
    InterviewSelectors.selectRedirectAfterCompleted
  );

  public readonly openQuestionTitle$ = this._store.select(
    InterviewSelectors.selectOpenQuestionTitle
  );

  public readonly primaryQuestionTitle$ = this._store.select(
    InterviewSelectors.selectPrimaryQuestionTitle
  );

  public readonly type$ = this._store.select(
    InterviewSelectors.selectType
  );

  public readonly openQuestionOptional$ = this._store.select(
    InterviewSelectors.selectOpenQuestionOptional
  );

  public readonly customLogo$ = this._store.select(
    InterviewSelectors.selectCustomLogo
  );

  public readonly logoUrl$ = this._store.select(
    InterviewSelectors.selectLogoUrl
  );

  constructor(
    private readonly _store: Store<InterviewState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(InterviewActions.resetState());
  }

  public startInterview(startDto: StartInterviewDto): void {
    this._store.dispatch(InterviewActions.startInterview({ startDto }));
  }

  public finishInterview(): void {
    this._store.dispatch(InterviewActions.finishInterview());
  }

  public previousQuestion(): void {
    this._store.dispatch(InterviewActions.previousQuestion());
  }

  public answerPrimaryQuestion(primaryQuestionAnswer: number): void {
    this._store.dispatch(
      InterviewActions.answerPrimaryQuestion({ primaryQuestionAnswer })
    );
  }

  public answerOpenQuestion(openQuestionAnswer?: string): void {
    this._store.dispatch(
      InterviewActions.answerOpenQuestion({ openQuestionAnswer })
    );
  }

  public nextQuestion(): void {
    this._store.dispatch(InterviewActions.nextQuestion());
  }


}
