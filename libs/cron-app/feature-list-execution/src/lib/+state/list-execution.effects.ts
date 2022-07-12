import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, filter } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { ExecutionService } from '@nui/cron-app/application';
import { ListExecutionFacade } from './list-execution.facade';
import * as ListExecutionActions from './list-execution.actions';

@Injectable()
export class ListExecutionEffects {
  public readonly loadExecutions$ = createEffect(() => {
    return this._listExecutionFacade.executionsQuery$.pipe(
      filter(query => !!query),
      switchMap((query) => {
        return this._executionService.getAll(query!).pipe(
          map((res) => {
            return ListExecutionActions.loadExecutionsSuccess({ res });
          }),
          catchError((error) => {
            return of(ListExecutionActions.loadExecutionsFailure({ error }));
          })
        );
      })
    );
  });

  constructor(
    private readonly _actions$: Actions,
    private readonly _listExecutionFacade: ListExecutionFacade,
    private readonly _executionService: ExecutionService
  ) {}
}
