import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { combineLatest, map, Subscription } from 'rxjs';

import { AccountPlan, SurveyStatus, SurveyType } from '@nui/feedback-shared/core';
import { Dialog } from '@nui/shared-app/ui/dialog';
import { HomeFacade } from '../+state/home.facade';
import { CreateSurveyDialogComponent } from '@nui/feedback-app/feature-create-survey';
import { AuthAppFacade } from '@nui/+auth/app';
import { AccountFacade, StartTrialDialogComponent } from '@nui/feedback-app/account';
import { DeleteSurveyDialogComponent } from '@nui/feedback-app/feature-delete-survey';

@Component({
  selector: 'nui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly SurveyType = SurveyType;

  public readonly surveyStatus = SurveyStatus;

  public readonly AccountPlan = AccountPlan;

  public readonly emptySurveysMessage$ = this._homeFacade.emptySurveysMessage$;

  public readonly loadingSurveys$ = this._homeFacade.loadingSurveys$;

  public readonly paginatedSurveys$ = this._homeFacade.paginatedSurveys$;

  public readonly surveysTotalAmount$ = this._homeFacade.surveysTotalAmount$;

  public readonly showingSurveys$ = this._homeFacade.showingSurveys$;

  public readonly disablePreviousSurvey$ =
    this._homeFacade.disablePreviousSurvey$;

  public readonly disableNextSurvey$ = this._homeFacade.disableNextSurvey$;

  public readonly welcomeMessage$ = this._authAppFacade.welcomeMessage$;

  public readonly limitedMode$ = this._accountFacade.limitedMode$;

  public readonly account$ =  this._accountFacade.account$;

  public readonly accountLimitReached$ = combineLatest([
    this._accountFacade.account$,
    this._homeFacade.surveys$,
  ]).pipe(
    map(([account, surveys]) => {
      return (
        surveys.length > 1 &&
        [AccountPlan.UNSET, AccountPlan.CANCELED].includes(account?.plan as any)
      );
    })
  );

  constructor(
    private readonly _homeFacade: HomeFacade,
    private readonly _authAppFacade: AuthAppFacade,
    private readonly _accountFacade: AccountFacade,
    private readonly _dialog: Dialog
  ) {}

  public ngOnInit(): void {
    this._homeFacade.loadSurveys();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._homeFacade.resetState();
  }

  public nextSurveysPage(): void {
    this._homeFacade.nextSurveysPage();
  }

  public previousSurveysPage(): void {
    this._homeFacade.previousSurveysPage();
  }

  public createSuveyClicked(): void {
    this._dialog
      .create(CreateSurveyDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this._homeFacade.loadSurveys();
      });
  }

  public deleteSurveyClicked(surveyId: string, surveyName: string): void {
    this._dialog
      .create(DeleteSurveyDialogComponent, {
        data: {
          surveyId,
          surveyName,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this._homeFacade.loadSurveys();
      });
  }

  public openStartTrialDialog(): void {
    this._dialog.create(StartTrialDialogComponent, {
      disposeOnNavigation: true,
      disableClose: false,
    });
  }
}
