import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  GetAllExecutionQueryDto,
  GetAllExecutionDto,
} from '@nui/cron-shared/core';
import { CronAppApplicationConfig } from '../cron-app-application.config';
import { handleQuery } from '../handlers/handle-get-all-query';
import {
  errorHandler,
  fetchDataHandler,
  GetAllResponseDto,
} from '@nui/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class ExecutionService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: CronAppApplicationConfig
  ) {}

  public getAll(
    params: GetAllExecutionQueryDto
  ): Observable<GetAllResponseDto<GetAllExecutionDto>> {
    return this._http
      .get(`${this._config.baseApi}/v1/execution/all`, {
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
