import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  CreateIntegrationDto,
  errorHandler,
  fetchDataHandler,
  GetAllQueryDto,
  GetAllResponseDto,
  PatchIntegrationDto,
  requestHandler,
  Integration,
} from '@nui/feedback-shared/core';
import { FeedbackAppApplicationConfig } from '../feedback-app-application.config';
import { handleQuery } from '../handlers/handle-get-all-query';

@Injectable({
  providedIn: 'root',
})
export class IntegrationService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: FeedbackAppApplicationConfig
  ) {}

  public get(integrationId: string): Observable<Integration> {
    return this._http
      .get(`${this._config.baseApi}/v1/integration/${integrationId}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public delete(integrationId: string): Observable<Integration> {
    return this._http
      .delete(`${this._config.baseApi}/v1/integration/${integrationId}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public create(dto: CreateIntegrationDto): Observable<Integration> {
    return this._http
      .post(`${this._config.baseApi}/v1/integration`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public patch(dto: PatchIntegrationDto): Observable<Integration> {
    return this._http
      .patch(`${this._config.baseApi}/v1/integration`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public getAll(
    params: GetAllQueryDto
  ): Observable<GetAllResponseDto<Integration>> {
    return this._http
      .get(`${this._config.baseApi}/v1/integration/all`, {
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
