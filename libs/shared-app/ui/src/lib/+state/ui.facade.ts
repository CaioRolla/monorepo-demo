import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UiState } from './ui.reducer';
import * as Actions from './ui.actions';
import * as Selectors from './ui.selectors';

@Injectable()
export class UiFacade {
  public readonly sidebarIsOpen$ = this._store.select(
    Selectors.getSidebarIsOpen
  );

  constructor(private readonly _store: Store<UiState>) {}


  public openSidebar(): void {
    this._store.dispatch(Actions.openSidebar());
  }

  public closeSidebar(): void {
    this._store.dispatch(Actions.closeSidebar());
  }

  public toggleSidebar(): void {
    this._store.dispatch(Actions.toggleSidebar());
  }

  public setPageTitle(title: string): void {
    this._store.dispatch(Actions.setPageTitle({ title }));
  }


}
