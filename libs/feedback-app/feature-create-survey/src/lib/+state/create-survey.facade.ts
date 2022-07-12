import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { CreateSurveyState } from './create-survey.reducer';
import * as CreateSurveySelectors from './create-survey.selectors';
import * as CreateSurveyActions from './create-survey.actions';
import { CreateSurveyDto } from '@nui/feedback-shared/core';

@Injectable()
export class CreateSurveyFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly creatingSurvey$ = this._store.select(
    CreateSurveySelectors.selectCreatingSurvey
  );

  constructor(
    private readonly _store: Store<CreateSurveyState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(CreateSurveyActions.resetState());
  }

  public createSurvey(createDto: CreateSurveyDto): void {
    this._store.dispatch(CreateSurveyActions.createSurvey({ createDto }));
  }
}
