import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  Schedule,
  CreateScheduleDto,
  PatchScheduleDto,
} from '@nui/cron-shared/core';
import { CronAppApplicationConfig } from '../cron-app-application.config';
import {
  errorHandler,
  fetchDataHandler,
  requestHandler,
} from '@nui/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: CronAppApplicationConfig
  ) {}

  public get(scheduleId: string): Observable<Schedule> {
    return this._http
      .get(`${this._config.baseApi}/v1/schedule/${scheduleId}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public create(dto: CreateScheduleDto): Observable<Schedule> {
    return this._http
      .post(`${this._config.baseApi}/v1/schedule`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public patch(dto: PatchScheduleDto): Observable<Schedule> {
    return this._http
      .patch(`${this._config.baseApi}/v1/schedule`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }
}
