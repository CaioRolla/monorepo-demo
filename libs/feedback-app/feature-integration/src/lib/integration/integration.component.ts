import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { IntegrationFacade } from '../+state/integration.facade';

@Component({
  selector: 'nui-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  constructor(private readonly _integrationFacade: IntegrationFacade) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._integrationFacade.resetState();
  }
}
