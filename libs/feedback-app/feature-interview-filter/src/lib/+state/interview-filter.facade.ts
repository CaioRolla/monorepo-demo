import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { InterviewFilterState } from './interview-filter.reducer';
import * as InterviewFilterSelectors from './interview-filter.selectors';
import * as InterviewFilterActions from './interview-filter.actions';

@Injectable()
export class InterviewFilterFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loadingfilterData$ = this._store.select(
    InterviewFilterSelectors.selectLoadingfilterData
  );

  public readonly displayEmptyMessage$ = this._store.select(
    InterviewFilterSelectors.selectDisplayEmptyMessage
  );

  public readonly filterDataError$ = this._store.select(
    InterviewFilterSelectors.selectFilterDataError
  );

  public readonly filterData$ = this._store.select(
    InterviewFilterSelectors.selectFilterData
  );

  public readonly filterDataIdentifiers$ = this._store.select(
    InterviewFilterSelectors.selectFilterDataIdentifiers
  );

  public readonly filter$ = this._store.select(
    InterviewFilterSelectors.selectFilter
  );

  public readonly appliedFilter$ = this._store.select(
    InterviewFilterSelectors.selectAppliedFilter
  );

  constructor(
    private readonly _store: Store<InterviewFilterState>,
    private readonly _actions$: Actions
  ) {}

  public applyFilter(): void {
    this._store.dispatch(InterviewFilterActions.applyFilter());
  }

  public clearFilter(): void {
    this._store.dispatch(InterviewFilterActions.clearFilter());
  }


  public resetState(): void {
    this._store.dispatch(InterviewFilterActions.resetState());
  }

  public loadfilterData(surveyId?: string): void {
    this._store.dispatch(InterviewFilterActions.loadfilterData({ surveyId }));
  }

  public registerFilterChange(
    key: string,
    value: string,
    checked: boolean
  ): void {
    this._store.dispatch(
      InterviewFilterActions.registerFilterChange({ key, value, checked })
    );
  }
}
