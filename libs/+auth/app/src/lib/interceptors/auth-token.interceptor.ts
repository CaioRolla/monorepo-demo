import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';

import { AuthAppFacade } from '../+state/auth-app.facade';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private _authAppFacade: AuthAppFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this._authAppFacade.token$.pipe(
      take(1),
      map((token) => {
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            ref: localStorage.getItem('ref') || '',
          },
        });
      }),
      switchMap((req) => {
        return next.handle(req);
      })
    );
  }
}
