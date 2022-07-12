import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { distinctUntilChanged, filter, startWith, Subscription } from 'rxjs';

import { SettingsSurveyFacade } from '../../+state/settings-survey.facade';
import { CustomValidators } from '@nui/shared-app/forms/validators';
import {
  DEFAULT_OPEN_QUESTION_TITLE,
  getQuestionByType,
  SurveyStatus,
  SurveyType,
} from '@nui/feedback-shared/core';

@Component({
  selector: 'nui-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsTabComponent implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  public readonly form = this._initForm();

  public readonly patchingSurvey$ = this._settingsSurveyFacade.patchingSurvey$;

  public readonly loadedSurvey$ = this._settingsSurveyFacade.loadedSurvey$;

  @Input() surveyId!: string;

  constructor(
    private readonly _settingsSurveyFacade: SettingsSurveyFacade,
    private readonly _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this._handleFormChange();
    this._patchForm();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private _initForm() {
    return this._fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      desc: [''],
      type: [''],
      customLogo: [false, [Validators.required]],
      logoBase64: [''],
      status: [SurveyStatus.ACTIVE, [Validators.required]],
      template: ['', []],
      primaryQuestionTitle: ['', [Validators.required]],
      redirectAfterCompleted: [false, [Validators.required]],
      redirectAfterCompletedUrl: ['', []],
      openQuestionEnabled: [true, [Validators.required]],
      openQuestionOptional: [false],
      openQuestionTitle: [DEFAULT_OPEN_QUESTION_TITLE],
      canAnswerMultipleTimes: [true, [Validators.required]],
    });
  }

  public patchlogoBase64(base64: string | null): void {
    this.form.get('logoBase64')?.patchValue(base64);
  }

  private _patchForm(): void {
    const sub = this._settingsSurveyFacade.loadedSurvey$
      .pipe(filter((v) => !!v))
      .subscribe((survey) => {
        if (survey) {
          this.form.setValue({
            id: survey.id,
            name: survey.name,
            desc: survey.desc,
            type: survey.type,
            status: survey.status,
            template: survey.template,
            customLogo: survey.customLogo,
            logoBase64: '',
            primaryQuestionTitle: survey.primaryQuestionTitle,
            redirectAfterCompleted: survey.redirectAfterCompleted,
            redirectAfterCompletedUrl: survey.redirectAfterCompletedUrl,
            openQuestionEnabled: survey.openQuestionEnabled,
            openQuestionOptional: survey.openQuestionOptional,
            openQuestionTitle: survey.openQuestionTitle,
            canAnswerMultipleTimes: survey.canAnswerMultipleTimes,
          });
        }
      });
    this._subscriptions.add(sub);
  }

  private _handleFormChange(): void {
    const sub = this.form.valueChanges
      .pipe(
        startWith(this.form.value),
        distinctUntilChanged((a, b) => _.isEqual(a, b))
      )
      .subscribe((values) => {
        if (!values.customPrimaryQuestionTitle) {
          this.form
            .get('primaryQuestionTitle')
            ?.setValue(getQuestionByType(values.type));
        }

        if (values.openQuestionEnabled) {
          this.form
            .get('openQuestionTitle')
            ?.setValidators([Validators.required]);
        } else {
          this.form.get('openQuestionTitle')?.setValidators([]);
        }
        if (!values.customOpenQuestionTitle) {
          this.form
            .get('openQuestionTitle')
            ?.setValue(DEFAULT_OPEN_QUESTION_TITLE);
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
      this._settingsSurveyFacade.patchSurvey({
        ...this.form.value,
      });
    }
  }
}
