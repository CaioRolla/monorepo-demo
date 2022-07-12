import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, Observable, of, take } from 'rxjs';

import { InterviewFacade } from '../+state/interview.facade';

@Injectable({
  providedIn: 'root',
})
export class StartInterviewResolver implements Resolve<boolean> {
  constructor(
    private readonly _interviewFacade: InterviewFacade,
    private readonly _router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    const surveyId = route.paramMap.get('surveyId') as string;

    const primaryQuestionAnswerString = route.queryParamMap.get(
      'primaryQuestionAnswer'
    );

    const primaryQuestionAnswer = primaryQuestionAnswerString
      ? Number(primaryQuestionAnswerString)
      : undefined;

    this._interviewFacade.startInterview({
      surveyId,
      url: window.location.href,
      primaryQuestionAnswer,
    });

    return this._interviewFacade.starting$.pipe(
      filter((v) => !v),
      take(1)
    );
  }
}
