import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  errorHandler,
  fetchDataHandler,
  requestHandler,
  Interview,
  StartInterviewDto,
  StartInterviewResponseDto,
  FinishInterviewDto,
  GetAllResponseDto,
  GetAllInterviewDto,
  GetAllInterviewFilterDto,
} from '@nui/feedback-shared/core';
import { FeedbackAppApplicationConfig } from '../feedback-app-application.config';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: FeedbackAppApplicationConfig
  ) {}

  public start(dto: StartInterviewDto): Observable<StartInterviewResponseDto> {
    return this._http
      .post(`${this._config.baseApi}/v1/interview/start`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public finish(dto: FinishInterviewDto): Observable<Interview> {
    return this._http
      .post(`${this._config.baseApi}/v1/interview/finish`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public getAll(
    dto: GetAllInterviewFilterDto
  ): Observable<GetAllResponseDto<GetAllInterviewDto>> {
    return this._http
      .post(`${this._config.baseApi}/v1/interview/all`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }
}
