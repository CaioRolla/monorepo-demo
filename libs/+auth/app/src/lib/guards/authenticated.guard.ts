import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { concatLatestFrom } from '@ngrx/effects';
import { UserStatus } from '@nui/+auth/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthAppFacade } from '../+state/auth-app.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private readonly _authAppFacade: AuthAppFacade, 
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    if (state.root.queryParams['_redirectUrl']) {
      localStorage.setItem(`_redirectUrl`, state.root.queryParams['_redirectUrl']);
    }

    if (state.root.queryParams['ref'] && !localStorage.getItem('ref')) {
      localStorage.setItem(`ref`, state.root.queryParams['ref']);
    }

    if(state.root.queryParams['ref']){
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: {
          ...state.root.queryParams,
          ref: undefined
        }
      });
    }

    if (state.root.queryParams['_token']) {
      this._authAppFacade.setToken(state.root.queryParams['_token']);
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: {
          _token: undefined
        }
      });
    }

    return this._authAppFacade.token$.pipe(
      concatLatestFrom(() => this._authAppFacade.user$),
      map(([token, user]) => {

        if(user?.status === UserStatus.PENDING_CONFIRMATION){
          localStorage.removeItem(`_token`);
          return this._router.parseUrl(`/auth/confirm-email/${user.email}`);
        }

        const redirectUrl = localStorage.getItem(`_redirectUrl`);

        if(token && redirectUrl){
          localStorage.removeItem(`_redirectUrl`);
          window.location.href = redirectUrl;
        }

        if (token) return true;

        return this._router.parseUrl('/auth/sign-in');
      })
    );
  }
}
