import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';

import { GetAllInterviewFilterDto, SurveyType } from '@nui/feedback-shared/core';
import { SurveyDashboardFacade } from '../+state/survey-dashboard.facade';

@Component({
  selector: 'nui-survey-dashboard',
  templateUrl: './survey-dashboard.component.html',
  styleUrls: ['./survey-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyDashboardComponent implements OnDestroy {
  private readonly _subscriptions = new Subscription();

  public readonly surveyType = SurveyType;

  public readonly surveyId = this._route.snapshot.paramMap.get(
    'surveyId'
  ) as string;

  public readonly stats$ = this._surveyDashboardFacade.stats$;

  public readonly loadingStats$ = this._surveyDashboardFacade.loadingStats$;

  public readonly surveyName$ = this.stats$.pipe(
    map((stats) => stats?.surveyName)
  );

  public readonly CSATrange = ['😡', '😕', '😐', '😊', '😍'];
  public readonly satisfactionColorRange = ['#dc2626', '#d97706', '#fbbf24', '#34d399', '#10b981'];


  constructor(
    private readonly _surveyDashboardFacade: SurveyDashboardFacade,
    private readonly _route: ActivatedRoute
  ) {}

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._surveyDashboardFacade.resetState();
  }

  public applyFilter(filter?: GetAllInterviewFilterDto): void {
    this._surveyDashboardFacade.applyFilter(filter);
  }
}
