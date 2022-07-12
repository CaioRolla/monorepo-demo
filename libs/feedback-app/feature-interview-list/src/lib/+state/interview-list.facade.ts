import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { InterviewListState } from './interview-list.reducer';
import * as InterviewListSelectors from './interview-list.selectors';
import * as InterviewListActions from './interview-list.actions';
import { GetAllInterviewFilterDto } from '@nui/feedback-shared/core';

@Injectable()
export class InterviewListFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loadingInterviews$ = this._store.select(
    InterviewListSelectors.selectLoadingInterviews
  );

  public readonly interviewsRes$ = this._store.select(
    InterviewListSelectors.selectInterviewsRes
  );

  public readonly interviewsError$ = this._store.select(
    InterviewListSelectors.selectInterviewsError
  );

  public readonly interviewsPage$ = this._store.select(
    InterviewListSelectors.selectInterviewsPage
  );

  public readonly appliedFilter$ = this._store.select(
    InterviewListSelectors.selectAppliedFilter
  );

  public readonly interviews$ = this._store.select(
    InterviewListSelectors.selectInterviews
  );

  public readonly interviewsTotalAmount$ = this._store.select(
    InterviewListSelectors.selectInterviewsTotalAmount
  );

  public readonly interviewsTotalPages$ = this._store.select(
    InterviewListSelectors.selectInterviewsTotalPages
  );

  public readonly paginatedInterviews$ = this._store.select(
    InterviewListSelectors.selectPaginatedInterviews
  );

  public readonly displayEmptyInterviewsMessage$ = this._store.select(
    InterviewListSelectors.selectDisplayEmptyInterviewsMessage
  );

  public readonly disablePreviousInterviews$ = this._store.select(
    InterviewListSelectors.selectDisablePreviousInterviews
  );

  public readonly disableNextInterviews$ = this._store.select(
    InterviewListSelectors.selectDisableNextInterviews
  );

  public readonly showingInterviews$ = this._store.select(
    InterviewListSelectors.selectShowingInterviews
  );

  constructor(
    private readonly _store: Store<InterviewListState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(InterviewListActions.resetState());
  }

  public nextInterviewsPage(): void {
    this._store.dispatch(InterviewListActions.nextInterviewsPage());
  }

  public previousInterviewsPage(): void {
    this._store.dispatch(InterviewListActions.previousInterviewsPage());
  }

  public loadInterviews(filter: GetAllInterviewFilterDto): void {
    this._store.dispatch(InterviewListActions.loadInterviews({ filter }));
  }
}
