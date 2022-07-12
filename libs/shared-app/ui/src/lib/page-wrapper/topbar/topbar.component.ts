import { Component, OnInit } from '@angular/core';

import { UiFacade } from '../../+state';

@Component({
  selector: 'nui-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  constructor(private readonly _uiFacade: UiFacade) {}

  public toggleSidebar(): void {
    this._uiFacade.toggleSidebar();
  }
}
