import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Account, AccountStatsResponseDto } from '@nui/cron-shared/core';
import { CronAppApplicationConfig } from '../cron-app-application.config';
import { errorHandler, fetchDataHandler } from '@nui/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: CronAppApplicationConfig
  ) {}

  public getStripeCustomerPortalURL(): Observable<{ url: string }> {
    return this._http
      .get(`${this._config.baseApi}/v1/account/stripe-customer-portal`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public getStats(): Observable<AccountStatsResponseDto> {
    return this._http.get(`${this._config.baseApi}/v1/account/stats`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }

  public getMy(): Observable<Account> {
    return this._http.get(`${this._config.baseApi}/v1/account/my`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }
}
