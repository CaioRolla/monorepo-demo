import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ViewChild,
} from '@angular/core';
import moment from 'moment';

import { Dialog, NUI_DIALOG_DATA } from '@nui/shared-app/ui/dialog';
import { SaveScheduleFacade } from '../+state/save-schedule.facade';
import { SaveScheduleComponent } from '../save-schedule/save-schedule.component';

@Component({
  selector: 'nui-save-schedule-dialog',
  templateUrl: './save-schedule-dialog.component.html',
  styleUrls: ['./save-schedule-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveScheduleDialogComponent implements OnInit {
  @ViewChild(SaveScheduleComponent, { static: true })
  public saveScheduleRef!: SaveScheduleComponent;

  public readonly isEdit = !!this.data?.scheduleId;

  public readonly loadingSchedule$ = this._saveScheduleFacade.loadingSchedule$;

  public readonly savingSchedule$ = this._saveScheduleFacade.savingSchedule$;

  constructor(
    private readonly _saveScheduleFacade: SaveScheduleFacade,
    private readonly _dialog: Dialog,
    @Inject(NUI_DIALOG_DATA) public readonly data?: any
  ) {}

  ngOnInit(): void {}

  public onCancel() {
    this._dialog.close();
  }

  public onCreate(): void {
    this.saveScheduleRef.form.markAllAsTouched();
    this.saveScheduleRef.form.updateValueAndValidity();
    if (this.saveScheduleRef.form.valid) {
      const {
        name,
        desc,
        url,
        type,
        method,
        trigger,
        cronExpression,
        timezone,
        headers,
        payload,
        notifyOnError,
        notifyEmail,
        recurring,
        responseType
      } = this.saveScheduleRef.form.value;

      this._saveScheduleFacade.createSchedule({
        name,
        desc,
        url,
        type,
        method,
        trigger:
          trigger && !recurring
            ? moment(trigger, 'DD-MM-YYYY HH:mm').toDate()
            : undefined,
        cronExpression: recurring ? cronExpression : undefined,
        timezone: recurring ? timezone : undefined,
        headers,
        payload,
        notifyOnError,
        notifyEmail,
        responseType
      });
    }
  }

  public onPatch(): void {
    this.saveScheduleRef.form.markAllAsTouched();
    this.saveScheduleRef.form.updateValueAndValidity();
    if (this.saveScheduleRef.form.valid) {
      const {
        name,
        desc,
        url,
        type,
        method,
        trigger,
        cronExpression,
        timezone,
        headers,
        payload,
        status,
        id,
        notifyOnError,
        notifyEmail,
        recurring,
        responseType
      } = this.saveScheduleRef.form.value;

      this._saveScheduleFacade.patchSchedule({
        id,
        name,
        desc,
        url,
        type,
        method,
        trigger:
          trigger && !recurring
            ? moment(trigger, 'DD-MM-YYYY HH:mm').toDate()
            : undefined,
        cronExpression: recurring ? cronExpression : undefined,
        timezone: recurring ? timezone : undefined,
        headers,
        payload,
        notifyOnError,
        notifyEmail,
        status,
        responseType
      });
    }
  }
}
