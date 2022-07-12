import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SurveyType } from '@nui/feedback-shared/core';

import { distinctUntilChanged, filter, map, Subscription } from 'rxjs';

import { InterviewFacade } from '../+state/interview.facade';

@Component({
  selector: 'nui-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly surveyType = SurveyType;

  public readonly NPSRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  public readonly primaryQuestionAnswer = new FormControl(null);

  public readonly openQuestionAnswer = new FormControl(null);

  public readonly currentQuestionIndex$ =
    this._interviewFacade.currentQuestionIndex$;

  public readonly currentQuestionTranslate$ =
    this._interviewFacade.currentQuestionIndex$.pipe(
      map((tabIndex) => {
        return `translateX(-${tabIndex * 100}%)`;
      }),
      map((translate) => this._sanitizer.bypassSecurityTrustStyle(translate))
    );

  public readonly disablePrevious$ = this._interviewFacade.disablePrevious$;

  public readonly disableNext$ = this._interviewFacade.disableNext$;

  public readonly openQuestionEnabled$ =
    this._interviewFacade.openQuestionEnabled$;

  public readonly redirectAfterCompleted$ =
    this._interviewFacade.redirectAfterCompleted$;

  public readonly openQuestionTitle$ = this._interviewFacade.openQuestionTitle$;

  public readonly primaryQuestionTitle$ =
    this._interviewFacade.primaryQuestionTitle$;

  public readonly type$ = this._interviewFacade.type$;

  public readonly openQuestionOptional$ = this._interviewFacade.openQuestionOptional$;

  public readonly customLogo$ = this._interviewFacade.customLogo$;

  public readonly logoUrl$ = this._interviewFacade.logoUrl$;

  public readonly startError$ = this._interviewFacade.startError$;

  constructor(
    private readonly _interviewFacade: InterviewFacade,
    private readonly _sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this._handlePrimaryQuestionStateChange();
    this._handlePrimaryQuestionChange();
    this._handleOpenQuestionChange();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._interviewFacade.resetState();
  }

  private _handlePrimaryQuestionChange(): void {
    const sub = this.primaryQuestionAnswer.valueChanges
      .pipe(filter((v) => v !== null))
      .subscribe((value) => {
        this._interviewFacade.answerPrimaryQuestion(value);
      });
    this._subscriptions.add(sub);
  }

  private _handleOpenQuestionChange(): void {
    const sub = this.openQuestionAnswer.valueChanges
      .pipe(filter((v) => v !== null))
      .subscribe((value) => {
        this._interviewFacade.answerOpenQuestion(value);
      });
    this._subscriptions.add(sub);
  }

  private _handlePrimaryQuestionStateChange(): void {
    const sub = this._interviewFacade.primaryQuestionAnswer$
      .pipe(
        distinctUntilChanged(),
        filter((v) => v !== this.primaryQuestionAnswer.value)
      )
      .subscribe((value) => {
        this.primaryQuestionAnswer.patchValue(value);
      });
    this._subscriptions.add(sub);
  }

  public finishInterview(): void {
    this._interviewFacade.finishInterview();
  }

  public previousQuestion(): void {
    this._interviewFacade.previousQuestion();
  }

  public nextQuestion(): void {
    this._interviewFacade.nextQuestion();
  }
}
