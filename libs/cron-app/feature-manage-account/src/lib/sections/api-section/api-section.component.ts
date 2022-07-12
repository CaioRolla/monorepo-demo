import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AuthAppFacade } from '@nui/+auth/app';
import { Snackbar } from '@nui/shared-app/ui/snackbar';

declare let $localize: any;
const copySuccessMessage = $localize`Copied API key to Clipboard`;

@Component({
  selector: 'nui-api-section',
  templateUrl: './api-section.component.html',
  styleUrls: ['./api-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiSectionComponent {
  public readonly apiKey$ = this._authFacade.apiKey$;

  constructor(
    private readonly _authFacade: AuthAppFacade,
    private readonly _snackbar: Snackbar
  ) {}

  public copiedToClipboard(): void {
    this._snackbar.open({
      message: copySuccessMessage,
      icon: 'clipboard',
    });
  }
}
