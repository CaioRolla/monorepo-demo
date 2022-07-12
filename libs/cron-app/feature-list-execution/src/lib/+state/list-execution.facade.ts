import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { ListExecutionState } from './list-execution.reducer';
import * as ListExecutionSelectors from './list-execution.selectors';
import * as ListExecutionActions from './list-execution.actions';
import { GetAllExecutionQueryDto } from '@nui/cron-shared/core';

@Injectable()
export class ListExecutionFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loadingExecutions$ = this._store.select(
    ListExecutionSelectors.selectLoadingExecutions
  );

  public readonly loadingExecutionsSilently$ = this._store.select(
    ListExecutionSelectors.selectLoadingExecutionsSilently
  );
  
  public readonly executionsRes$ = this._store.select(
    ListExecutionSelectors.selectExecutionsRes
  );

  public readonly executionsResData$ = this._store.select(
    ListExecutionSelectors.selectExecutionsResData
  );

  public readonly loadExecutionsError$ = this._store.select(
    ListExecutionSelectors.selectLoadExecutionsError
  );

  public readonly executionsPage$ = this._store.select(
    ListExecutionSelectors.selectExecutionsPage
  );

  public readonly disableNextExecutions$ = this._store.select(
    ListExecutionSelectors.selectDisableNextExecutions
  );

  public readonly disablePreviousExecutions$ = this._store.select(
    ListExecutionSelectors.selectDisablePreviousExecutions
  );

  public readonly paginatedExecutionsCount$ = this._store.select(
    ListExecutionSelectors.selectPaginatedExecutionsCount
  );

  public readonly executionsResDataCount$ = this._store.select(
    ListExecutionSelectors.selectExecutionsResDataCount
  );

  public readonly displayEmptyMessage$ = this._store.select(
    ListExecutionSelectors.selectDisplayEmptyMessage
  );

  public readonly executionsQuery$ = this._store.select(
    ListExecutionSelectors.selectExecutionsQuery
  );
  
  constructor(
    private readonly _store: Store<ListExecutionState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(ListExecutionActions.resetState());
  }

  public loadExecutions(query: GetAllExecutionQueryDto): void {
    this._store.dispatch(ListExecutionActions.loadExecutions({ query }));
  }

  public nextExecutions(): void {
    this._store.dispatch(ListExecutionActions.nextExecutions());
  }

  public previousExecutions(): void {
    this._store.dispatch(ListExecutionActions.previousExecutions());
  }
  
}
