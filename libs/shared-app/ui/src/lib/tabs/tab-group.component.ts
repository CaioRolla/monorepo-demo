import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ContentChildren,
  AfterContentInit,
  QueryList,
  OnDestroy,
  AfterViewInit,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  delay,
  filter,
  map,
  pairwise,
  shareReplay,
  startWith,
  tap,
} from 'rxjs/operators';

import { TabHeaderComponent } from './tab-header/tab-header.component';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'nui-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent
  implements AfterContentInit, OnDestroy, AfterViewInit
{
  private readonly _subscription = new Subscription();

  private _sizeObserver?: ResizeObserver;

  @Input() public card = false;

  @ContentChildren(TabHeaderComponent)
  private _headers?: QueryList<TabHeaderComponent>;
  @ContentChildren(TabComponent) private _tabs?: QueryList<TabComponent>;

  public readonly animationEnabled$ = new BehaviorSubject<boolean>(false);

  private readonly _previous$ = new BehaviorSubject<string | null>(null);
  private readonly _currentTab$ = new BehaviorSubject<string | null>(null);

  public readonly currentTabIndex$ = this._currentTab$.pipe(
    map((tabId) => {
      if (!this._headers || !tabId) {
        return 0;
      }
      return this._headers
        .map((header) => header.tabId)
        .findIndex((headerTabId) => headerTabId === tabId);
    }),
    shareReplay()
  );

  public readonly currentTabTranslate$ = this.currentTabIndex$.pipe(
    map((tabIndex) => {
      return `translateX(-${tabIndex * 100}%)`;
    }),
    map((translate) => this._sanitizer.bypassSecurityTrustStyle(translate))
  );

  private readonly _currentHeight$ = new BehaviorSubject<number>(0);

  public readonly currentHeight$ = this._currentHeight$.pipe(
    filter((v) => !!v)
  );

  constructor(
    private readonly _sanitizer: DomSanitizer,
    private readonly _cd: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this._listenToTabChange();
    this._handleHideBeforeAndAfterAnimation();
  }

  ngAfterViewInit(): void {
    const tab = this._tabs?.get(0);
    const header = this._headers?.get(0);
    if (tab) {
      setTimeout(() => {
        tab?.show();
        header?.select();
        const rect = tab?.contentRef?.nativeElement.getBoundingClientRect();
        this._currentHeight$.next(rect.height);
      });
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    if (this._sizeObserver) {
      this._sizeObserver.disconnect();
    }
  }

  private _listenToTabChange(): void {
    const subs = this._headers?.map((header) =>
      header.clickEvent.subscribe(() => {
        this._previous$.next(this._currentTab$.value);
        this._currentTab$.next(header.tabId);
        this._headers?.forEach((h) => h.unselect());
        header?.select();

        const tab = this._tabs?.find((t) => t.tabId === header.tabId);

        this._sizeObserver?.disconnect();
        this._sizeObserver = undefined;

        this._sizeObserver = new ResizeObserver(() => {
          const rect = tab?.contentRef?.nativeElement.getBoundingClientRect();
          this._currentHeight$.next(rect.height);

          this._cd.detectChanges();
        });

        this._sizeObserver.observe(tab?.contentRef?.nativeElement);
      })
    );
    subs?.forEach((sub) => this._subscription.add(sub));
  }

  private _handleHideBeforeAndAfterAnimation(): void {
    const sub = this.currentTabIndex$
      .pipe(
        tap(() => this.animationEnabled$.next(true)),
        pairwise(),
        tap(([oldTabIndex, newTabIndex]) => {
          const tab = this._tabs?.get(newTabIndex);
          tab?.show();
        }),
        delay(50),
        tap(([oldTabIndex, newTabIndex]) => {
          const newTab = this._tabs?.get(newTabIndex);
          const rect =
            newTab?.contentRef?.nativeElement.getBoundingClientRect();
          this._currentHeight$.next(rect.height);
        }),
        delay(250),
        tap(() => this.animationEnabled$.next(false))
      )
      .subscribe(([oldTabIndex, newTabIndex]) => {
        if (oldTabIndex !== newTabIndex) {
          // this._tabs?.get(oldTabIndex)?.hide();
        }
      });
    this._subscription.add(sub);
  }
}
