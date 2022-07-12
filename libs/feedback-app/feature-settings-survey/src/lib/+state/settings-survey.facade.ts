import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { SettingsSurveyState } from './settings-survey.reducer';
import * as SettingsSurveySelectors from './settings-survey.selectors';
import * as SettingsSurveyActions from './settings-survey.actions';
import { PatchSurveyDto } from '@nui/feedback-shared/core';

@Injectable()
export class SettingsSurveyFacade {
  public readonly actions$ = this._actions$.pipe(map((a) => a.type));

  public readonly loadingSurvey$ = this._store.select(
    SettingsSurveySelectors.selectLoadingSurvey
  );

  public readonly loadedSurvey$ = this._store.select(
    SettingsSurveySelectors.selectLoadedSurvey
  );

  public readonly loadSurveyError$ = this._store.select(
    SettingsSurveySelectors.selectLoadSurveyError
  );

  public readonly patchingSurvey$ = this._store.select(
    SettingsSurveySelectors.selectPatchingSurvey
  );

  public readonly identifiersRes$ = this._store.select(
    SettingsSurveySelectors.selectIdentifiersRes
  );

  public readonly loadingIdentifiers$ = this._store.select(
    SettingsSurveySelectors.selectLoadingIdentifiers
  );

  public readonly identifiersError$ = this._store.select(
    SettingsSurveySelectors.selectIdentifiersError
  );

  public readonly identifiers$ = this._store.select(
    SettingsSurveySelectors.selectIdentifiers
  );

  public readonly identifiersTotalAmount$ = this._store.select(
    SettingsSurveySelectors.selectIdentifiersTotalAmount
  );

  public readonly identifiersPages$ = this._store.select(
    SettingsSurveySelectors.selectIdentifiersPages
  );

  public readonly identifiersPage$ = this._store.select(
    SettingsSurveySelectors.selectIdentifiersPage
  );

  public readonly paginatedIdentifiers$ = this._store.select(
    SettingsSurveySelectors.selectPaginatedIdentifiers
  );

  public readonly displayEmptyIdentifiersMessage$ = this._store.select(
    SettingsSurveySelectors.selectDisplayEmptyIdentifiersMessage
  );

  public readonly showingIdentifiers$ = this._store.select(
    SettingsSurveySelectors.selectShowingIdentifiers
  );

  public readonly disablePreviousIdentifier$ = this._store.select(
    SettingsSurveySelectors.selectDisablePreviousIdentifier
  );

  public readonly disableNextIdentifier$ = this._store.select(
    SettingsSurveySelectors.selectDisableNextIdentifier
  );

  constructor(
    private readonly _store: Store<SettingsSurveyState>,
    private readonly _actions$: Actions
  ) {}

  public resetState(): void {
    this._store.dispatch(SettingsSurveyActions.resetState());
  }

  public loadSurvey(surveyId: string): void {
    this._store.dispatch(SettingsSurveyActions.loadSurvey({ surveyId }));
  }

  public patchSurvey(patchDto: PatchSurveyDto): void {
    this._store.dispatch(SettingsSurveyActions.patchSurvey({ patchDto }));
  }

  public loadIdentifiers(surveyId: string): void {
    this._store.dispatch(SettingsSurveyActions.loadIdentifiers({ surveyId }));
  }

  public nextIdentifiersPage(): void {
    this._store.dispatch(SettingsSurveyActions.nextIdentifiersPage());
  }

  public previousIdentifiersPage(): void {
    this._store.dispatch(SettingsSurveyActions.previousIdentifiersPage());
  }
}
