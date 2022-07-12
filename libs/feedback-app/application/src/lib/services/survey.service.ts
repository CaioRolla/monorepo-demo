import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  CreateSurveyDto,
  errorHandler,
  fetchDataHandler,
  GetAllInterviewFilterDto,
  GetAllQueryDto,
  GetAllResponseDto,
  GetAllSurveyDto,
  GetSurveyFilterDataDto,
  PatchSurveyDto,
  requestHandler,
  SetupSurveyDto,
  Survey,
  SurveyStatsResponseDto,
} from '@nui/feedback-shared/core';
import { FeedbackAppApplicationConfig } from '../feedback-app-application.config';
import { handleQuery } from '../handlers/handle-get-all-query';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: FeedbackAppApplicationConfig
  ) {}

  public stats(
    dto: GetAllInterviewFilterDto
  ): Observable<SurveyStatsResponseDto> {
    return this._http
      .post(`${this._config.baseApi}/v1/survey/stats`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public getFilterData(surveyId?: string): Observable<GetSurveyFilterDataDto> {
    return this._http
      .get(`${this._config.baseApi}/v1/survey/filter-data`, {
        params: { ...(surveyId ? { surveyId } : {}) },
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public get(surveyId: string): Observable<Survey> {
    return this._http.get(`${this._config.baseApi}/v1/survey/${surveyId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }

  public delete(surveyId: string): Observable<Survey> {
    return this._http.delete(`${this._config.baseApi}/v1/survey/${surveyId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }

  public create(dto: CreateSurveyDto): Observable<Survey> {
    return this._http
      .post(`${this._config.baseApi}/v1/survey`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public setup(dto: SetupSurveyDto): Observable<Survey> {
    return this._http
      .patch(`${this._config.baseApi}/v1/survey/setup`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public patch(dto: PatchSurveyDto): Observable<Survey> {
    return this._http
      .patch(`${this._config.baseApi}/v1/survey`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public getAll(
    params: GetAllQueryDto
  ): Observable<GetAllResponseDto<GetAllSurveyDto>> {
    return this._http
      .get(`${this._config.baseApi}/v1/survey/all`, {
        params: handleQuery(params),
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }
}
