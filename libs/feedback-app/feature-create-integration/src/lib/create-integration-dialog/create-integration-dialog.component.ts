import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Dialog } from '@nui/shared-app/ui/dialog';
import { CreateIntegrationFacade } from '../+state/create-integration.facade';

@Component({
  selector: 'nui-create-integration-dialog',
  templateUrl: './create-integration-dialog.component.html',
  styleUrls: ['./create-integration-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateIntegrationDialogComponent {
  public readonly form = this._initForm();

  public readonly creatingIntegration$ = this._createIntegrationFacade.creatingIntegration$;

  public get nameControl() {
    return this.form.controls.name as FormControl;
  }

  public get descControl() {
    return this.form.controls.desc as FormControl;
  }

  constructor(
    private readonly _createIntegrationFacade: CreateIntegrationFacade,
    private readonly _dialog: Dialog,
    private readonly _fb: FormBuilder,
  ) {}

  private _initForm() {
    return this._fb.group({
      name: ['', [Validators.required]],
      desc: [''],
    });
  }

  public onCancel(): void {
    this._dialog.close();
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._createIntegrationFacade.createIntegration(this.form.value);
    }
  }

}
