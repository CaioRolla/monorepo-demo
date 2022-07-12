import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SurveyType } from '@nui/feedback-shared/core';
import { Snackbar } from '@nui/shared-app/ui/snackbar';
import { combineLatest, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { SettingsSurveyFacade } from '../../+state/settings-survey.facade';
import {
  generateCSATTemplate01,
  generateCSATTemplate02,
  generateLIKETemplate01,
  generateLIKETemplate02,
  generateNPSTemplate01,
  generateNPSTemplate02,
} from './template';

// eslint-disable-next-line no-var
declare let $localize: any;

const copySuccessMessage = $localize`Copied Survey URL to Clipboard`;

@Component({
  selector: 'nui-share-tab',
  templateUrl: './share-tab.component.html',
  styleUrls: ['./share-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareTabComponent implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  public readonly quillStyle = {
    height: '400px',
  };

  public readonly quill = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      // ['blockquote', 'code-block'],
      // [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      // [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      // ['clean'],
    ],
  };

  public readonly template01$ = combineLatest([
    this._settingsSurveyFacade.loadedSurvey$.pipe(filter((v) => !!v)),
    this._settingsSurveyFacade.identifiers$.pipe(filter((v) => !!v)),
  ]).pipe(
    map(([survey, identifiers]) => {
      const primaryQuestionTitle = survey?.primaryQuestionTitle as string;

      const query = identifiers
        .map((id) => `${id.key}=[ADD_VALUE_HERE]`)
        .join('&');
      const url = `https://app.surveyx.co/i/${survey?.id}?${query}`;

      switch (survey?.type) {
        case SurveyType.CSAT:
          return generateCSATTemplate01(primaryQuestionTitle, url);
        case SurveyType.LIKE:
          return generateLIKETemplate01(primaryQuestionTitle, url);
        case SurveyType.NPS:
          return generateNPSTemplate01(primaryQuestionTitle, url);
      }

      return '';
    })
  );

  public readonly template02$ = combineLatest([
    this._settingsSurveyFacade.loadedSurvey$.pipe(filter((v) => !!v)),
    this._settingsSurveyFacade.identifiers$.pipe(filter((v) => !!v)),
  ]).pipe(
    map(([survey, identifiers]) => {
      const primaryQuestionTitle = survey?.primaryQuestionTitle as string;

      const query = identifiers
        .map((id) => `${id.key}=[ADD_VALUE_HERE]`)
        .join('&')
        .trim();
      const url = `https://app.surveyx.co/i/${survey?.id}?${query}`;

      switch (survey?.type) {
        case SurveyType.CSAT:
          return generateCSATTemplate02(primaryQuestionTitle, url);
        case SurveyType.LIKE:
          return generateLIKETemplate02(primaryQuestionTitle, url);
        case SurveyType.NPS:
          return generateNPSTemplate02(primaryQuestionTitle, url);
      }

      return '';
    })
  );

  public readonly url$ = combineLatest([
    this._settingsSurveyFacade.loadedSurvey$.pipe(filter((v) => !!v)),
    this._settingsSurveyFacade.identifiers$.pipe(filter((v) => !!v)),
  ]).pipe(
    map(([survey, identifiers]) => {
      const query = identifiers
        .map((id) => `${id.key}=[ADD_VALUE_HERE]`)
        .join('&')
        .trim();

      return query
        ? `https://app.surveyx.co/i/${survey?.id}?${query}`
        : `https://app.surveyx.co/i/${survey?.id}`;
    })
  );

  public readonly template01Preview$ = this.template01$.pipe(
    map((template) => {
      return this._sanitizer.bypassSecurityTrustHtml(
        template.replace('width=', '')
      );
    })
  );

  public readonly template02Preview$ = this.template02$.pipe(
    map((template) => {
      return this._sanitizer.bypassSecurityTrustHtml(template);
    })
  );

  public readonly form01 = new FormControl('');

  public readonly form02 = new FormControl('');

  constructor(
    private readonly _settingsSurveyFacade: SettingsSurveyFacade,
    private readonly _sanitizer: DomSanitizer,
    private readonly _snackbar: Snackbar
  ) {}

  ngOnInit(): void {
    this._handlePatchForm();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private _handlePatchForm(): void {
    const sub = this.template01$.subscribe((template) => {
      this.form01.patchValue(template);
    });
    this._subscriptions.add(sub);

    const sub2 = this.template02$.subscribe((template) => {
      this.form02.patchValue(template);
    });
    this._subscriptions.add(sub2);
  }

  public copiedURLToClipboard(): void {
    this._snackbar.open({
      message: copySuccessMessage,
      icon: 'clipboard',
    });
  }
}
