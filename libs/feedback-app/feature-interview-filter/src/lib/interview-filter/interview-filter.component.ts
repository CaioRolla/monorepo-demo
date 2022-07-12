import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  Output,
} from '@angular/core';

import { filter, Subscription } from 'rxjs';

import { InterviewFilterFacade } from '../+state/interview-filter.facade';

@Component({
  selector: 'nui-interview-filter',
  templateUrl: './interview-filter.component.html',
  styleUrls: ['./interview-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewFilterComponent implements OnDestroy, OnInit {
  private readonly _subscriptions = new Subscription();

  @Input() surveyId!: string;

  @Input() applyingFilters = false;

  public readonly filterDataIdentifiers$ =
    this._interviewFilterFacade.filterDataIdentifiers$;

  public readonly displayEmptyMessage$ =
    this._interviewFilterFacade.displayEmptyMessage$;

  @Output() appliedFilter = this._interviewFilterFacade.appliedFilter$.pipe(filter(v => !!v));

  constructor(private readonly _interviewFilterFacade: InterviewFilterFacade) {}

  public ngOnInit(): void {
    this._interviewFilterFacade.loadfilterData(this.surveyId);
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._interviewFilterFacade.resetState();
  }

  public registerFilterChange(
    key: string,
    value: string,
    checked: boolean
  ): void {
    this._interviewFilterFacade.registerFilterChange(key, value, checked);
  }

  public applyfilter(): void {
    this._interviewFilterFacade.applyFilter();
  }

  public clearFilter(): void {
    this._interviewFilterFacade.clearFilter();
  }
}

