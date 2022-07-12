import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import moment from 'moment';
import * as momentTZ from 'moment-timezone';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime, filter, map, take } from 'rxjs/operators';
import { ECalendarValue, IDatePickerDirectiveConfig } from 'ng2-date-picker';

import { CustomValidators } from '@nui/shared-app/forms/validators';
import { SaveScheduleFacade } from '../+state/save-schedule.facade';
import {
  AccountPlan,
  ScheduleMethod,
  ScheduleResponseType,
  ScheduleStatus,
  ScheduleType,
} from '@nui/cron-shared/core';
import { AccountFacade } from '@nui/cron-app/account';

@Component({
  selector: 'nui-save-schedule',
  templateUrl: './save-schedule.component.html',
  styleUrls: ['./save-schedule.component.scss'],
})
export class SaveScheduleComponent implements OnDestroy, OnInit {
  public readonly datePickerConfig: IDatePickerDirectiveConfig = {
    format: 'DD-MM-YYYY HH:mm',
    drops: 'up'
  };

  public readonly ScheduleMethod = ScheduleMethod;

  public readonly ScheduleStatus = ScheduleStatus;

  public readonly ScheduleResponseType = ScheduleResponseType;

  public readonly timezoneOptions = momentTZ.tz.names();

  private readonly _subscriptions = new Subscription();

  private readonly _showMore$ = new BehaviorSubject<boolean>(false);

  public readonly showMore$ = this._showMore$.asObservable();

  public readonly account$ = this._accountFacade.account$;

  public readonly disableNotificationOption$ = this.account$.pipe(
    map((account) => !account || account?.plan === AccountPlan.FREE)
  );

  public readonly form = this._initForm();

  public get nameControl() {
    return this.form.controls.name as FormControl;
  }

  public get descControl() {
    return this.form.controls.desc as FormControl;
  }

  public get typeControl() {
    return this.form.controls.type as FormControl;
  }

  public get urlControl() {
    return this.form.controls.url as FormControl;
  }

  public get methodControl() {
    return this.form.controls.method as FormControl;
  }

  public get triggerControl() {
    return this.form.controls.trigger as FormControl;
  }

  public get frequencyControl() {
    return this.form.controls.frequency as FormControl;
  }

  public get cronExpressionControl() {
    return this.form.controls.cronExpression as FormControl;
  }

  public get timezoneControl() {
    return this.form.controls.timezone as FormControl;
  }

  public get headersControl() {
    return this.form.controls.headers as FormArray;
  }

  public get payloadControl() {
    return this.form.controls.payload as FormControl;
  }

  public get statusControl() {
    return this.form.controls.status as FormControl;
  }

  public get recurringControl() {
    return this.form.controls.recurring as FormControl;
  }

  public get idControl() {
    return this.form.controls.id as FormControl;
  }

  public get notifyOnErrorControl() {
    return this.form.controls.notifyOnError as FormControl;
  }

  public get notifyEmailControl() {
    return this.form.controls.notifyEmail as FormControl;
  }

  public get responseTypeControl() {
    return this.form.controls.responseType as FormControl;
  }

  @Input() scheduleId?: string;

  constructor(
    private readonly _saveScheduleFacade: SaveScheduleFacade,
    private readonly _accountFacade: AccountFacade,
    private readonly _fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this._handleRecurringChange();
    this._handleFrequencyChange();
    this._handleNotifyOnError();

    if (this.scheduleId) {
      this._handleStateBindOfSchedule();
      this._saveScheduleFacade.loadSchedule(this.scheduleId);
    }
  }

  private _initForm() {
    return this._fb.group({
      id: [],
      name: ['', [Validators.required, Validators.maxLength(255)]],
      desc: ['', [Validators.maxLength(500)]],
      url: [
        '',
        [Validators.required, CustomValidators.URL, Validators.maxLength(500)],
      ],
      type: [ScheduleType.ONE_TIME, [Validators.required]],
      method: [ScheduleMethod.POST, [Validators.required]],
      trigger: [null, [Validators.required]],
      status: [ScheduleStatus.ACTIVE],
      frequency: ['* * * * *'],
      recurring: [false],
      cronExpression: [
        '* * * * *',
        [Validators.required, CustomValidators.cronExpression],
      ],
      notifyOnError: [false, Validators.required],
      notifyEmail: [''],
      timezone: [momentTZ.tz.guess()],
      headers: this._fb.array([this._fb.group({ key: [''], value: [''] })]),
      payload: [''],
      responseType: [ScheduleResponseType.TEXT],
    });
  }

  private _handleRecurringChange(): void {
    const sub = this.recurringControl.valueChanges.subscribe((recurring) => {
      if (recurring) {
        this.cronExpressionControl.addValidators([
          Validators.required,
          CustomValidators.cronExpression,
        ]);
        this.triggerControl.removeValidators([Validators.required]);
        this.timezoneControl.addValidators([Validators.required]);
        this.cronExpressionControl.patchValue('* * * * *');
        this.triggerControl.reset();
        this.typeControl.patchValue(ScheduleType.RECURRING);
      } else {
        this.typeControl.patchValue(ScheduleType.ONE_TIME);
        this.cronExpressionControl.patchValue(null);
        this.cronExpressionControl.removeValidators([
          Validators.required,
          CustomValidators.cronExpression,
        ]);
        this.triggerControl.addValidators([Validators.required]);
        this.timezoneControl.removeValidators([Validators.required]);
        this.cronExpressionControl.reset();
      }
    });
    this._subscriptions.add(sub);
  }

  private _handleStateBindOfSchedule(): void {
    const sub = this._saveScheduleFacade.schedule$
      .pipe(
        filter((v) => !!v && !!v.id),
        take(1)
      )
      .subscribe((schedule) => {
        if (schedule) {
          this.idControl.patchValue(schedule.id);
          this.nameControl.patchValue(schedule.name);
          this.descControl.patchValue(schedule.desc);
          this.urlControl.patchValue(schedule.url);
          this.methodControl.patchValue(schedule.method);
          this.statusControl.patchValue(schedule.status);
          this.typeControl.patchValue(schedule.type);
          this.notifyOnErrorControl.patchValue(schedule.notifyOnError);
          this.responseTypeControl.patchValue(schedule.responseType);


          if (schedule.notifyEmail) {
            this.notifyEmailControl.patchValue(schedule.notifyEmail);
            this.notifyEmailControl.addValidators([
              Validators.required,
              Validators.email,
            ]);
          }

          if (schedule.trigger) {
            this.triggerControl.patchValue(moment(schedule.trigger).format(this.datePickerConfig.format));
            this.recurringControl.setValue(false);
            this.cronExpressionControl.removeValidators([
              Validators.required,
              CustomValidators.cronExpression,
            ]);
            this.triggerControl.addValidators([Validators.required]);
            this.timezoneControl.removeValidators([Validators.required]);

            this.cronExpressionControl.patchValue(null)
          } else {
            this.recurringControl.setValue(true);
            this.cronExpressionControl.addValidators([
              Validators.required,
              CustomValidators.cronExpression,
            ]);
            this.triggerControl.removeValidators([Validators.required]);
            this.timezoneControl.addValidators([Validators.required]);
            if (
              ['* * * * *', '*/30 * * * *', '0 * * * *', '0 0 * * *'].includes(
                schedule.cronExpression as string
              )
            ) {
              this.frequencyControl.patchValue(schedule.cronExpression);
            } else {
              this.frequencyControl.patchValue('custom');
            }
            this.cronExpressionControl.patchValue(schedule.cronExpression);
          }

          this.timezoneControl.patchValue(schedule.timezone);

          if (schedule.headers.length > 0) {
            this.headersControl.removeAt(0);
          }

          schedule.headers.forEach((header) => {
            this.headersControl.push(
              this._fb.group({ key: [header.value], value: [header.value] })
            );
          });

          try {
            const obj = JSON.parse(schedule.payload);
            const formatted = JSON.stringify(obj, null, 2);
            this.payloadControl.patchValue(formatted);
          } catch (error) {
            this.payloadControl.patchValue(schedule.payload);
          }
        }
      });
    this._subscriptions.add(sub);
  }

  private _handleNotifyOnError(): void {
    const sub = this.notifyOnErrorControl.valueChanges.subscribe(
      (notifyOnError) => {
        if (notifyOnError) {
          this.notifyEmailControl.addValidators([
            Validators.required,
            Validators.email,
          ]);
        } else {
          this.notifyEmailControl.removeValidators([
            Validators.required,
            Validators.email,
          ]);
          this.notifyEmailControl.reset();
        }
      }
    );
    this._subscriptions.add(sub);
  }

  private _handleFrequencyChange(): void {
    const sub = this.frequencyControl.valueChanges.subscribe((frequency) => {
      if (frequency == 'custom') {
        this.cronExpressionControl.patchValue('* * * * *');
      } else {
        this.cronExpressionControl.patchValue(frequency);
      }
    });
    this._subscriptions.add(sub);
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._saveScheduleFacade.resetState();
  }

  public toggleShowMore(): void {
    this._showMore$.next(!this._showMore$.value);
  }

  public addHeaderClicked(): void {
    this.headersControl.push(this._fb.group({ key: [''], value: [''] }));
  }

  public removeHeaderClicked(index: number): void {
    this.headersControl.removeAt(index);
  }

  public onPayloadFocusOut(): void {
    const value = this.payloadControl.value;

    try {
      const obj = JSON.parse(value);
      const formatted = JSON.stringify(obj, null, 2);
      this.payloadControl.patchValue(formatted);
    } catch (error) {}
  }
}
