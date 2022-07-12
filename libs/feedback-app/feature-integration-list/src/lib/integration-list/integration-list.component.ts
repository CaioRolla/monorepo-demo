import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Dialog } from '@nui/shared-app/ui/dialog';

import { Subscription } from 'rxjs';

import { IntegrationListFacade } from '../+state/integration-list.facade';
import { CreateIntegrationDialogComponent } from '@nui/feedback-app/feature-create-integration';


// eslint-disable-next-line no-var

@Component({
  selector: 'nui-integration-list',
  templateUrl: './integration-list.component.html',
  styleUrls: ['./integration-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationListComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  constructor(
    private readonly _integrationListFacade: IntegrationListFacade,
    private readonly _dialog: Dialog
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._integrationListFacade.resetState();
  }

  public createCustomIntegrationClicked(): void {
    this._dialog.create(CreateIntegrationDialogComponent);
  }
}
