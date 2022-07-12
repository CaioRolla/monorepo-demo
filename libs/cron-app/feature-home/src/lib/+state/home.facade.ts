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

  public readonly stats$ = this._store.select(
    HomeSelectors.selectStats
  );

  public readonly loadingStats$ = this._store.select(
    HomeSelectors.selectLoadingStats
  );

  public readonly loadStatsError$ = this._store.select(
    HomeSelectors.selectLoadStatsError
  );

  public readonly statsExecutionsCount$ = this._store.select(
    HomeSelectors.selectStatsExecutionsCount
  );

  public readonly statsFailureExecutionsCount$ = this._store.select(
    HomeSelectors.selectStatsFailureExecutionsCount
  );

  public readonly statsSuccessExecutionsCount$ = this._store.select(
    HomeSelectors.selectStatsSuccessExecutionsCount
  );

  public readonly statsSchedules$ = this._store.select(
    HomeSelectors.selectStatsSchedules
  );

  public readonly statsSchedulesCount$ = this._store.select(
    HomeSelectors.selectStatsSchedulesCount
  );  

  public readonly schedulesPage$ = this._store.select(
    HomeSelectors.selectSchedulesPage
  );  

  public readonly paginatedSchedules$ = this._store.select(
    HomeSelectors.selectPaginatedSchedules
  );  

  public readonly disableNextSchedules$ = this._store.select(
    HomeSelectors.selectDisableNextSchedules
  );  

  public readonly disablePreviousSchedules$ = this._store.select(
    HomeSelectors.selectDisablePreviousSchedules
  );  

  public readonly paginatedSchedulesCount$ = this._store.select(
    HomeSelectors.selectPaginatedSchedulesCount
  );    

  public readonly displayEmptyMessage$ = this._store.select(
    HomeSelectors.selectDisplayEmptyMessage
  );    

  constructor(
    private readonly _store: Store<HomeState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(HomeActions.resetState());
  }

  public loadStats(): void {
    this._store.dispatch(HomeActions.loadStats());
  }

  public nextSchedules(): void {
    this._store.dispatch(HomeActions.nextSchedules());
  }

  public previousSchedules(): void {
    this._store.dispatch(HomeActions.previousSchedules());
  }
}