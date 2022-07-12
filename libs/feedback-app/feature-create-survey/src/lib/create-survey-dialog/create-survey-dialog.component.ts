import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Dialog, NUI_DIALOG_DATA } from '@nui/shared-app/ui/dialog';
import { CreateSurveyFacade } from '../+state/create-survey.facade';

@Component({
  selector: 'nui-create-survey-dialog',
  templateUrl: './create-survey-dialog.component.html',
  styleUrls: ['./create-survey-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSurveyDialogComponent {
  public readonly form = this._initForm();

  public readonly creatingSurvey$ = this._createSurveyFacade.creatingSurvey$

  public get nameControl() {
    return this.form.controls.name as FormControl;
  }

  public get descControl() {
    return this.form.controls.desc as FormControl;
  }

  constructor(
    private readonly _dialog: Dialog,
    private readonly _fb: FormBuilder,
    private readonly _createSurveyFacade: CreateSurveyFacade
  ) {}

  private _initForm() {
    return this._fb.group({
      name: ['', [Validators.required]],
      desc: [''],
    });
  }

  public onCancel() {
    this._dialog.close();
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._createSurveyFacade.createSurvey(this.form.value);
    }
  }
}
