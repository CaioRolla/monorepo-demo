import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { map, Subscription } from 'rxjs';

import { SettingsSurveyFacade } from '../+state/settings-survey.facade';
import { TabHeaderComponent } from '@nui/shared-app/ui/tabs/tab-header/tab-header.component';

@Component({
  selector: 'nui-settings-survey',
  templateUrl: './settings-survey.component.html',
  styleUrls: ['./settings-survey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSurveyComponent
  implements OnDestroy, OnInit, AfterViewInit
{
  @ViewChildren(TabHeaderComponent)
  private _headers?: QueryList<TabHeaderComponent>;

  private readonly _subscriptions = new Subscription();

  public readonly surveyId = this._route.snapshot.paramMap.get(
    'surveyId'
  ) as string;

  public readonly tabId = this._route.snapshot.queryParamMap.get(
    'tabId'
  ) as string;

  public readonly surveyName$ = this._settingsSurveyFacade.loadedSurvey$.pipe(
    map((survey) => survey?.name)
  );

  constructor(
    private readonly _settingsSurveyFacade: SettingsSurveyFacade,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this._settingsSurveyFacade.loadSurvey(this.surveyId);
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._settingsSurveyFacade.resetState();
  }

  public ngAfterViewInit(): void {
    if (this.tabId) {
      const tab = this._headers?.find((header) => header.tabId === this.tabId);
      if (tab) {
        setTimeout(() => tab.clickEvent.emit());

        this._router.navigate(['.'], {
          relativeTo: this._route,
          queryParams: {},
        });
      }
    }
  }
}
