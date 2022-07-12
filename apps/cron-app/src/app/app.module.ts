import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HeroIconsModule,
  arrowRight,
  home,
  chartBar,
  adjustments,
  menuAlt1,
  arrowNarrowRight,
  chevronLeft,
  chevronRight,
  chevronDown,
  chevronUp,
  check,
  photograph,
  trash,
  paperClip,
  heart,
  calendar,
  currencyDollar,
  informationCircle,
  userGroup,
  clipboard,
  logout,
  cash,
  creditCard,
  checkCircleSolid,
  informationCircleSolid,
  exclamation,
  xCircleSolid,
  globeAlt,
  exclamationCircle,
  clock,
  plus,
  x,
  pencil,
  viewList,
  terminal,
  receiptTax,
  cog,
  support,
  mail
} from 'ng-heroicons';

import { OffcanvasModule } from '@nui/shared-app/ui/offcanvas';
import { SharedAppUiModule } from '@nui/shared-app/ui';
import { AppComponent } from './app.component';
import { AuthAppModule } from '@nui/+auth/app';
import { environment } from '../environments/environment';
import { AccountModule } from '@nui/cron-app/account';
import { CronAppApplicationModule } from '@nui/cron-app/application';
import { localStorageSync } from 'ngrx-store-localstorage';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@nui/cron-app/feature-home').then((m) => m.FeatureHomeModule),
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('@nui/cron-app/feature-terms').then((m) => m.FeatureTermsModule),
  },
  {
    path: 'execution',
    loadChildren: () =>
      import('@nui/cron-app/feature-list-execution').then(
        (m) => m.FeatureListExecutionModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('@nui/cron-app/feature-manage-account').then(
        (m) => m.FeatureManageAccountModule
      ),
  },
  {
    path: 'login-merch',
    loadChildren: () =>
      import('@nui/cron-app/feature-login-merch').then(
        (m) => m.FeatureLoginMerchModule
      ),
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
        metaReducers: [localStorageSyncReducer],
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production,
    }),

    HeroIconsModule.withIcons({
      arrowRight,
      home,
      chartBar,
      adjustments,
      menuAlt1,
      arrowNarrowRight,
      chevronLeft,
      chevronRight,
      check,
      photograph,
      trash,
      paperClip,
      heart,
      calendar,
      currencyDollar,
      informationCircle,
      userGroup,
      clipboard,
      logout,
      cash,
      creditCard,
      checkCircleSolid,
      informationCircleSolid,
      exclamation,
      xCircleSolid,
      globeAlt,
      exclamationCircle,
      clock,
      chevronDown,
      chevronUp,
      plus,
      x,
      pencil,
      viewList,
      terminal,
      receiptTax,
      cog,
      support,
      mail
    }),

    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),

    OffcanvasModule.forRoot(),
    SharedAppUiModule.forRoot({
      applicationName: 'beew.io',
    }),
    AuthAppModule.forRoot({
      applicationLogoUrl: 'assets/logo/icon-app.png',
      googleAuthUrl: `${environment.baseApi}/v1/auth/google`,
      signInMerchUrl: '/login-merch',
      signInSuccessRoute: '',
      termsOfServiceUrl: 'https://app.beew.io/en/terms/terms-of-service',
      baseApi:  environment.baseApi
    }),
    CronAppApplicationModule.forRoot({ baseApi: environment.baseApi }),
    AccountModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

const INIT_ACTION = '@ngrx/store/init';
const UPDATE_ACTION = '@ngrx/store/update-reducers';

const mergeReducer = (state: any, rehydratedState: any, action: any) => {
  if (
    (action.type === INIT_ACTION || action.type === UPDATE_ACTION) &&
    rehydratedState
  ) {
    return { ...state, ...rehydratedState };
  }
  return state;
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth-app'],
    rehydrate: true,
    mergeReducer,
  })(reducer);
}
