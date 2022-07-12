import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
  Injectable,
  InjectionToken,
  Injector,
  StaticProvider,
} from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UiFacade } from '../+state';
import { DialogRef } from './dialog-ref';

export const NUI_DIALOG_DATA = new InjectionToken<any>('NUI_DIALOG_DATA');

@Injectable()
export class Dialog {
  private _overlayRef?: OverlayRef;
  private _onCloseSubject = new Subject<void>();

  constructor(
    private readonly _overlay: Overlay,
    private readonly _injector: Injector,
    private readonly _uiFacade: UiFacade
  ) {}

  public create(
    component: ComponentType<any>,
    config?: OverlayConfig & { data?: any, disableClose?: boolean }
  ): DialogRef {
    if(this._overlayRef){
      throw new Error('Dialog is already open');
    }
    const injectionTokens = new WeakMap();

    injectionTokens.set(NUI_DIALOG_DATA, config?.data);

    const providers: StaticProvider[] = [
      { provide: NUI_DIALOG_DATA, useValue: config?.data },
    ];

    const injector = Injector.create({ parent: this._injector, providers });

    const positionStrategy = this._overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();


    this._overlayRef = this._overlay.create({
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy,
      backdropClass: [...(config?.backdropClass || []), (config?.disableClose ? 'dialog-disable-backdrop-click' : '')],
      ...(config ? config : {}),
    });
    const portal = new ComponentPortal(component, null, injector);
    this._overlayRef.attach(portal);

    this._overlayRef
      .backdropClick()
      .pipe(take(1))
      .subscribe((_) => this.close());


    return {
      close: () => this.close(),
      afterClosed: () => this._onCloseSubject.pipe(take(1)),
    };
  }

  public close(): void {
    this._onCloseSubject.next();
    this._overlayRef?.dispose();
    this._overlayRef = undefined;
  }
}
