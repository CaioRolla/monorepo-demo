import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { SetupSurveyState } from './setup-survey.reducer';
import * as SetupSurveySelectors from './setup-survey.selectors';
import * as SetupSurveyActions from './setup-survey.actions';
import { SetupSurveyDto } from '@nui/feedback-shared/core';

@Injectable()
export class SetupSurveyFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loadingSurvey$ = this._store.select(
    SetupSurveySelectors.selectLoadingSurvey
  );

  public readonly loadedSurvey$ = this._store.select(
    SetupSurveySelectors.selectLoadedSurvey
  );

  public readonly loadSurveyError$ = this._store.select(
    SetupSurveySelectors.selectLoadSurveyError
  );

  public readonly setuppingSurvey$ = this._store.select(
    SetupSurveySelectors.selectSetuppingSurvey
  );

  constructor(
    private readonly _store: Store<SetupSurveyState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(SetupSurveyActions.resetState());
  }

  public loadSurvey(surveyId: string): void {
    this._store.dispatch(SetupSurveyActions.loadSurvey({ surveyId }));
  }

  public setupSurvey(setupDto: SetupSurveyDto): void {
    this._store.dispatch(SetupSurveyActions.setupSurvey({ setupDto }));
  }
}
