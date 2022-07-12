import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetAllInterviewFilterDto } from '@nui/feedback-shared/core';

import { Subscription } from 'rxjs';

import { InterviewListFacade } from '../+state/interview-list.facade';

@Component({
  selector: 'nui-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewListComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly surveyId = this._route.snapshot.queryParamMap.get(
    'surveyId'
  ) as string;

  public readonly interviews$ = this._interviewListFacade.interviews$;

  public readonly loadingInterviews$ = this._interviewListFacade.loadingInterviews$;

  public readonly interviewsTotalAmount$ =
    this._interviewListFacade.interviewsTotalAmount$;

  public readonly interviewsTotalPages$ =
    this._interviewListFacade.interviewsTotalPages$;

  public readonly paginatedInterviews$ =
    this._interviewListFacade.paginatedInterviews$;

  public readonly displayEmptyInterviewsMessage$ =
    this._interviewListFacade.displayEmptyInterviewsMessage$;

  public readonly disablePreviousInterviews$ =
    this._interviewListFacade.disablePreviousInterviews$;

  public readonly disableNextInterviews$ =
    this._interviewListFacade.disableNextInterviews$;

  public readonly showingInterviews$ =
    this._interviewListFacade.showingInterviews$;

  constructor(
    private readonly _interviewListFacade: InterviewListFacade,
    private readonly _route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this._interviewListFacade.loadInterviews({
      surveyId: this.surveyId,
      identifiers: [],
    });
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._interviewListFacade.resetState();
  }

  public loadInterviews(filter: GetAllInterviewFilterDto): void {
    this._interviewListFacade.loadInterviews(filter);
  }

  public nextInterviewsPage(): void {
    this._interviewListFacade.nextInterviewsPage();
  }

  public previousInterviewsPage(): void {
    this._interviewListFacade.previousInterviewsPage();
  }
}
