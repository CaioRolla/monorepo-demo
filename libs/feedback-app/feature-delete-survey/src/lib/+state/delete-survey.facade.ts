import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { DeleteSurveyState } from './delete-survey.reducer';
import * as DeleteSurveySelectors from './delete-survey.selectors';
import * as DeleteSurveyActions from './delete-survey.actions';

@Injectable()
export class DeleteSurveyFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly deletingSurvey$ = this._store.select(
    DeleteSurveySelectors.selectDeletingSurvey
  );

  constructor(
    private readonly _store: Store<DeleteSurveyState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(DeleteSurveyActions.resetState());
  }

  public deleteSurvey(surveyId: string): void {
    this._store.dispatch(DeleteSurveyActions.deleteSurvey({ surveyId }));
  }
}
