import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { ExecutionStatus } from '@nui/cron-shared/core';
import { ListExecutionFacade } from '../+state/list-execution.facade';

@Component({
  selector: 'nui-list-execution',
  templateUrl: './list-execution.component.html',
  styleUrls: ['./list-execution.component.scss'],
})
export class ListExecutionComponent implements OnDestroy, OnInit {

  public readonly ExecutionStatus = ExecutionStatus;

  private readonly _subscriptions = new Subscription();

  public readonly query = this._route.snapshot.queryParams;

  public readonly loadingExecutions$ = this._listExecutionFacade.loadingExecutions$;

  public readonly executionsPage$ = this._listExecutionFacade.executionsPage$;

  public readonly executionsResData$ = this._listExecutionFacade.executionsResData$;

  public readonly disableNextExecutions$ = this._listExecutionFacade.disableNextExecutions$;

  public readonly disablePreviousExecutions$ = this._listExecutionFacade.disablePreviousExecutions$;

  public readonly paginatedExecutionsCount$ = this._listExecutionFacade.paginatedExecutionsCount$;

  public readonly executionsResDataCount$ = this._listExecutionFacade.executionsResDataCount$;

  public readonly displayEmptyMessage$ = this._listExecutionFacade.displayEmptyMessage$;

  public readonly loadingExecutionsSilently$ = this._listExecutionFacade.loadingExecutionsSilently$;
  
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _listExecutionFacade: ListExecutionFacade
    ) {}

  public ngOnInit(): void {
    this._listExecutionFacade.loadExecutions({ ...this.query, take: 5, page: 0 });
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._listExecutionFacade.resetState();
  }

  public nextExecutions(): void {
    this._listExecutionFacade.nextExecutions();
  }

  public previousExecutions(): void {
    this._listExecutionFacade.previousExecutions();
  }

}
