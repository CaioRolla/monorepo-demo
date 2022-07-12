import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules } from '@angular/router';
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
  refresh,
  menu,
  cog,
  fingerPrint,
  share,
  cube,
  chartPie,
  filter,
  beaker,
  arrowUp
} from 'ng-heroicons';
import { localStorageSync } from 'ngrx-store-localstorage';

import { OffcanvasModule } from '@nui/shared-app/ui/offcanvas';
import { SharedAppUiModule } from '@nui/shared-app/ui';
import { AppComponent } from './app.component';
import { AuthAppModule } from '@nui/+auth/app';
import { environment } from '../environments/environment';
import { AccountModule } from '@nui/feedback-app/account';
import { FeedbackAppApplicationModule } from '@nui/feedback-app/application';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@nui/feedback-app/feature-home').then((m) => m.FeatureHomeModule),
  },
  {
    path: 'survey-dashboard',
    loadChildren: () =>
      import('@nui/feedback-app/feature-survey-dashboard').then(
        (m) => m.FeatureSurveyDashboardModule
      ),
  },
  {
    path: 'interviews',
    loadChildren: () =>
      import('@nui/feedback-app/feature-interview-list').then(
        (m) => m.FeatureInterviewListModule
      ),
  },
  {
    path: 'integrations',
    loadChildren: () =>
      import('@nui/feedback-app/feature-integration-list').then(
        (m) => m.FeatureIntegrationListModule
      ),
  },
  {
    path: 'integration',
    loadChildren: () =>
      import('@nui/feedback-app/feature-integration').then(
        (m) => m.FeatureIntegrationModule
      ),
  },
  {
    path: 'i',
    loadChildren: () =>
      import('@nui/feedback-app/feature-interview').then(
        (m) => m.FeatureInterviewModule
      ),
  },
  {
    path: 'survey-setup',
    loadChildren: () =>
      import('@nui/feedback-app/feature-setup-survey').then(
        (m) => m.FeatureSetupSurveyModule
      ),
  },
  {
    path: 'survey-settings',
    loadChildren: () =>
      import('@nui/feedback-app/feature-settings-survey').then(
        (m) => m.FeatureSettingsSurveyModule
      ),
  },
  {
    path: 'login-merch',
    loadChildren: () =>
      import('@nui/feedback-app/feature-login-merch').then(
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
      // arrowRight,
      // home,
      chartBar,
      // adjustments,
      menuAlt1,
      // arrowNarrowRight,
      chevronLeft,
      chevronRight,
      check,
      photograph,
      trash,
      // paperClip,
      // heart,
      // calendar,
      // currencyDollar,
      // informationCircle,
      // userGroup,
      clipboard,
      logout,
      // cash,
      creditCard,
      // checkCircleSolid,
      // informationCircleSolid,
      exclamation,
      // xCircleSolid,
      // globeAlt,
      // exclamationCircle,
      // clock,
      // chevronDown,
      // chevronUp,
      plus,
      x,
      // pencil,
      // viewList,
      // terminal,
      // receiptTax,
      refresh,
      menu,
      cog,
      fingerPrint,
      share,
      cube,
      chartPie,
      viewList,
      filter,
      beaker,
      arrowUp
    }),

    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      preloadingStrategy: PreloadAllModules,
    }),

    OffcanvasModule.forRoot(),
    SharedAppUiModule.forRoot({
      applicationName: 'Surveyx',
    }),
    AuthAppModule.forRoot({
      applicationLogoUrl: 'assets/logo/logo01.png',
      googleAuthUrl: `${environment.baseApi}/v1/auth/google`,
      signInMerchUrl: '/login-merch',
      signInSuccessRoute: '/',
      termsOfServiceUrl: 'https://surveyx.co/terms-of-service/',
      baseApi: environment.baseApi
    }),
    FeedbackAppApplicationModule.forRoot({ baseApi: environment.baseApi }),
    AccountModule.forRoot({
      baseApi: environment.baseApi,
    }),
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
