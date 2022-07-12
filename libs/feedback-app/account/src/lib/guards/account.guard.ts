import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { AccountFacade } from '../+state/account.facade';
import { AuthAppFacade } from '@nui/+auth/app';

@Injectable({
  providedIn: 'root',
})
export class AccountGuard implements CanActivate {
  constructor(
    private readonly _accountFacade: AccountFacade,
    private readonly _authFacade: AuthAppFacade,
    private readonly _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._accountFacade.loadingAccount$.pipe(
      filter((loading) => !loading),
      withLatestFrom(
        this._accountFacade.account$,
        this._accountFacade.loadAccountError$
      ),
      filter(([loading, account, error]) => !!account || !!error),
      map(([loading, account, error]) => {
        if (error) {
          this._authFacade.logout();
        }

        return true;

        // return this._router.parseUrl('/onboarding');
      })
    );
  }
}
