import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  CreateIdentifierDto,
  errorHandler,
  fetchDataHandler,
  requestHandler,
  Identifier,
  GetAllIdentifiersQueryDto,
  GetAllResponseDto,
  GetAllIdentifierDto,
} from '@nui/feedback-shared/core';
import { FeedbackAppApplicationConfig } from '../feedback-app-application.config';
import { handleQuery } from '../handlers/handle-get-all-query';

@Injectable({
  providedIn: 'root',
})
export class IdentifierService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: FeedbackAppApplicationConfig
  ) {}

  public create(dto: CreateIdentifierDto): Observable<Identifier> {
    return this._http
      .post(`${this._config.baseApi}/v1/identifier`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public getAll(
    surveyId: string,
    params: GetAllIdentifiersQueryDto
  ): Observable<GetAllResponseDto<GetAllIdentifierDto>> {
    return this._http
      .get(`${this._config.baseApi}/v1/identifier/all/${surveyId}`, {
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
