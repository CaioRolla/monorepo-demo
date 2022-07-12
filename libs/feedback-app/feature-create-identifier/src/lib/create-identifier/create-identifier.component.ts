import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import _ from 'lodash';

import { distinctUntilChanged, filter, Subscription } from 'rxjs';

import { CreateIdentifierFacade } from '../+state/create-identifier.facade';

@Component({
  selector: 'nui-create-identifier',
  templateUrl: './create-identifier.component.html',
  styleUrls: ['./create-identifier.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateIdentifierComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  public readonly form = this.initForm();

  @Input() surveyId!: string;

  public readonly creatingIdentifier$ =
    this._createIdentifierFacade.creatingIdentifier$;

  @Output() created = this._createIdentifierFacade.identifier$.pipe(
    filter((v) => !!v),
    distinctUntilChanged((a, b) => _.isEqual(a, b))
  );

  constructor(
    private readonly _createIdentifierFacade: CreateIdentifierFacade,
    private readonly _fb: FormBuilder
  ) {}

  private initForm() {
    return this._fb.group({
      key: ['', [Validators.required]],
      primary: [false, [Validators.required]],
    });
  }

  public ngOnInit(): void {
    this._handleCreation();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._createIdentifierFacade.resetState();
  }

  public onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this._createIdentifierFacade.createIdentifier({
        surveyId: this.surveyId,
        ...this.form.value,
      });
    }
  }

  private _handleCreation(): void {
    const sub = this.created.subscribe(() => {
      this.form.reset();
      this.form.get('primary')?.setValue(false);
    });
    this._subscriptions.add(sub);
  }
}
