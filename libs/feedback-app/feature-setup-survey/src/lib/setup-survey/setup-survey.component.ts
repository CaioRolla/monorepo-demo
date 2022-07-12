import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { distinctUntilChanged, startWith, Subscription } from 'rxjs';

import {
  DEFAULT_OPEN_QUESTION_TITLE,
  getQuestionByType,
  SurveyType,
} from '@nui/feedback-shared/core';
import { SetupSurveyFacade } from '../+state/setup-survey.facade';
import { CustomValidators } from '@nui/shared-app/forms/validators';

@Component({
  selector: 'nui-setup-survey',
  templateUrl: './setup-survey.component.html',
  styleUrls: ['./setup-survey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupSurveyComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly surveyType = SurveyType;

  public readonly NPSRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  public readonly surveyId = this._route.snapshot.params.surveyId;

  public readonly form = this._initForm();

  public readonly setuppingSurvey$ = this._setupSurveyFacade.setuppingSurvey$;

  public readonly loadedSurvey$ = this._setupSurveyFacade.loadedSurvey$;

  constructor(
    private readonly _setupSurveyFacade: SetupSurveyFacade,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this._handleFormChange();
    this._setupSurveyFacade.loadSurvey(this.surveyId);
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._setupSurveyFacade.resetState();
  }

  private _initForm() {
    return this._fb.group({
      type: [SurveyType.CSAT, [Validators.required]],
      customPrimaryQuestionTitle: [false, [Validators.required]],
      primaryQuestionTitle: [getQuestionByType(SurveyType.NPS)],
      template: [''],
      customLogo: [false, [Validators.required]],
      logoBase64: [''],
      redirectAfterCompleted: [false, [Validators.required]],
      redirectAfterCompletedUrl: ['', []],
      openQuestionEnabled: [true, [Validators.required]],
      openQuestionOptional: [false],
      customOpenQuestionTitle: [false, [Validators.required]],
      openQuestionTitle: [DEFAULT_OPEN_QUESTION_TITLE],
      canAnswerMultipleTimes: [true, [Validators.required]],
    });
  }

  public patchlogoBase64(base64: string | null): void {
    this.form.get('logoBase64')?.patchValue(base64);
  }

  private _handleFormChange(): void {
    const sub = this.form.valueChanges
      .pipe(
        startWith(this.form.value),
        distinctUntilChanged((a, b) => _.isEqual(a, b))
      )
      .subscribe((values) => {
        if (values.customPrimaryQuestionTitle) {
          this.form
            .get('primaryQuestionTitle')
            ?.setValidators([Validators.required]);
        } else {
          this.form.get('primaryQuestionTitle')?.setValidators([]);
          this.form
            .get('primaryQuestionTitle')
            ?.patchValue(getQuestionByType(values.type));
        }

        if (values.customOpenQuestionTitle) {
          this.form
            .get('openQuestionTitle')
            ?.setValidators([Validators.required]);
        } else {
          this.form.get('openQuestionTitle')?.setValidators([]);
          this.form
            .get('openQuestionTitle')
            ?.patchValue(DEFAULT_OPEN_QUESTION_TITLE);
        }

        if (values.redirectAfterCompleted) {
          this.form
            .get('redirectAfterCompletedUrl')
            ?.setValidators([Validators.required, CustomValidators.URL]);
        } else {
          this.form.get('redirectAfterCompletedUrl')?.setValidators([]);
          this.form.get('redirectAfterCompletedUrl')?.reset();
        }

        if (values.customLogo) {
          this.form
            .get('logoBase64')
            ?.setValidators([Validators.required, CustomValidators.URL]);
        } else {
          this.form.get('logoBase64')?.setValidators([]);
          this.form.get('logoBase64')?.reset();
        }
      });
    this._subscriptions.add(sub);
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._setupSurveyFacade.setupSurvey({
        id: this.surveyId,
        ...this.form.value,
      });
    }
  }
}
