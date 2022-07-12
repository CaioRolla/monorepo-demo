import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { SurveyDashboardState } from './survey-dashboard.reducer';
import * as SurveyDashboardSelectors from './survey-dashboard.selectors';
import * as SurveyDashboardActions from './survey-dashboard.actions';
import { GetAllInterviewFilterDto } from '@nui/feedback-shared/core';

@Injectable()
export class SurveyDashboardFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly stats$ = this._store.select(
    SurveyDashboardSelectors.selectStats
  );

  public readonly statsError$ = this._store.select(
    SurveyDashboardSelectors.selectStatsError
  );

  public readonly loadingStats$ = this._store.select(
    SurveyDashboardSelectors.selectLoadingStats
  );

  public readonly appliedFilter$ = this._store.select(
    SurveyDashboardSelectors.selectAppliedFilter
  );

  constructor(
    private readonly _store: Store<SurveyDashboardState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(SurveyDashboardActions.resetState());
  }

  public loadStats(surveyId: string): void {
    this._store.dispatch(SurveyDashboardActions.loadStats({ surveyId }));
  }

  public applyFilter(filter?: GetAllInterviewFilterDto): void {
    this._store.dispatch(SurveyDashboardActions.applyFilter({ filter }));
  }
}
