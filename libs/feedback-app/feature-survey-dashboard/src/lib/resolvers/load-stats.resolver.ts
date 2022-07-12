import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, Observable, take } from 'rxjs';

import { SurveyDashboardFacade } from '../+state/survey-dashboard.facade';

@Injectable({
  providedIn: 'root',
})
export class LoadStatsResolver implements Resolve<boolean> {
  constructor(
    private readonly _surveyDashboardFacade: SurveyDashboardFacade,
    private readonly _router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const surveyId = route.paramMap.get('surveyId') as string;

    this._surveyDashboardFacade.loadStats(surveyId);

    return this._surveyDashboardFacade.loadingStats$.pipe(
      filter((v) => !v),
      take(1)
    );
  }
}
