import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { HomeState } from './home.reducer';
import * as HomeSelectors from './home.selectors';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly surveysRes$ = this._store.select(
    HomeSelectors.selectSurveysRes
  );

  public readonly surveysError$ = this._store.select(
    HomeSelectors.selectSurveysError
  );

  public readonly loadingSurveys$ = this._store.select(
    HomeSelectors.selectLoadingSurveys
  );

  public readonly surveysPage$ = this._store.select(
    HomeSelectors.selectSurveysPage
  );

  public readonly surveys$ = this._store.select(HomeSelectors.selectSurveys);

  public readonly surveysTotalAmount$ = this._store.select(
    HomeSelectors.selectSurveysTotalAmount
  );

  public readonly surveysPages$ = this._store.select(
    HomeSelectors.selectSurveysPages
  );

  public readonly paginatedSurveys$ = this._store.select(
    HomeSelectors.selectPaginatedSurveys
  );

  public readonly emptySurveysMessage$ = this._store.select(
    HomeSelectors.selectDisplayEmptySurveysMessage
  );

  public readonly showingSurveys$ = this._store.select(
    HomeSelectors.selectShowingSurveys
  );

  public readonly disablePreviousSurvey$ = this._store.select(
    HomeSelectors.selectDisablePreviousSurvey
  );

  public readonly disableNextSurvey$ = this._store.select(
    HomeSelectors.selectDisableNextSurvey
  );

  constructor(
    private readonly _store: Store<HomeState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(HomeActions.resetState());
  }

  public nextSurveysPage(): void {
    this._store.dispatch(HomeActions.nextSurveysPage());
  }

  public previousSurveysPage(): void {
    this._store.dispatch(HomeActions.previousSurveysPage());
  }

  public loadSurveys(): void {
    this._store.dispatch(HomeActions.loadSurveys());
  }
}
