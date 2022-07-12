import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  CreateIntegrationWebhookDto,
  errorHandler,
  fetchDataHandler,
  PatchIntegrationWebhookDto,
  requestHandler,
  IntegrationWebhook,
} from '@nui/feedback-shared/core';
import { FeedbackAppApplicationConfig } from '../feedback-app-application.config';

@Injectable({
  providedIn: 'root',
})
export class IntegrationWebhookService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: FeedbackAppApplicationConfig
  ) {}

  public get(integrationId: string): Observable<IntegrationWebhook> {
    return this._http
      .get(`${this._config.baseApi}/v1/webhook/${integrationId}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public delete(integrationId: string): Observable<IntegrationWebhook> {
    return this._http
      .delete(`${this._config.baseApi}/v1/webhook/${integrationId}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public create(
    dto: CreateIntegrationWebhookDto
  ): Observable<IntegrationWebhook> {
    return this._http
      .post(`${this._config.baseApi}/v1/webhook`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public patch(
    dto: PatchIntegrationWebhookDto
  ): Observable<IntegrationWebhook> {
    return this._http
      .patch(`${this._config.baseApi}/v1/webhook`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }
}
