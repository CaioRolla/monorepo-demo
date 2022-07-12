import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';

import { Asset } from '@nui/+asset/core';
import { AssetAppConfig } from '../asset-app.config';
import { errorHandler, fetchDataHandler } from '@nui/shared/utils';

@Injectable()
export class AssetService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: AssetAppConfig
  ) {}

  public get(assetId: string): Observable<Asset> {
    return this._http.get(`${this._config.baseApi}/v1/asset/${assetId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(errorHandler(err));
      }),
      map((res) => fetchDataHandler(res))
    );
  }

  public create(file: File): Observable<HttpEvent<Asset>> {
    const data = new FormData();

    data.append('file', file, file.name);

    return this._http
      .post(`${this._config.baseApi}/v1/asset`, data, { reportProgress: true, observe: "events" })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }
}
