import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector:
    '[nui-button],[nui-primary-button],[nui-danger-button],[nui-secondary-button],[nui-warning-button],[nui-reverse-primary-button],[nui-text-primary-button],[nui-text-neutral-button],[nui-accent-button],[nui-reverse-accent-button],[nui-reverse-warning-button],[nui-text-accent-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    class: 'button',
    '[class.button--primary]': 'isPrimary',
    '[class.button--secondary]': 'isSecondary',
    '[class.button--warning]': 'isWarning',
    '[class.button--danger]': 'isDanger',
    '[class.button--accent]': 'isAccent',
    '[class.button--reverse-primary]': 'isReversePrimary',
    '[class.button--reverse-warning]': 'isReverseWarning',
    '[class.button--reverse-accent]': 'isReverseAccent',
    '[class.button--text-primary]': 'isTextPrimary',
    '[class.button--text-neutral]': 'isTextNeutral',
    '[class.button--text-accent]': 'isTextAccent',
    '[class.button--neutral]': 'isNeutral',
    '[class.button--loading]': 'loading',
    '[class.button--animation-enabled]': 'animationEnabled',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit, AfterViewInit {
  public animationEnabled = false;

  @Input() public loading = false;

  public readonly isPrimary = this._hasHostAttributes('nui-primary-button');
  public readonly isSecondary = this._hasHostAttributes('nui-secondary-button');
  public readonly isWarning = this._hasHostAttributes('nui-warning-button');
  public readonly isDanger = this._hasHostAttributes('nui-danger-button');
  public readonly isReversePrimary = this._hasHostAttributes(
    'nui-reverse-primary-button'
  );
  public readonly isReverseWarning = this._hasHostAttributes(
    'nui-reverse-warning-button'
  );
  public readonly isTextPrimary = this._hasHostAttributes(
    'nui-text-primary-button'
  );
  public readonly isTextNeutral = this._hasHostAttributes(
    'nui-text-neutral-button'
  );
  public readonly isAccent = this._hasHostAttributes('nui-accent-button');
  public readonly isReverseAccent = this._hasHostAttributes(
    'nui-reverse-accent-button'
  );
  public readonly isTextAccent = this._hasHostAttributes(
    'nui-text-accent-button'
  );
  public readonly isNeutral = this._hasHostAttributes('nui-button');

  constructor(
    public readonly elementRef: ElementRef,
    public readonly _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animationEnabled = true;
      this._cd.markForCheck();
    }, 200);
  }

  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) =>
      this.elementRef.nativeElement.hasAttribute(attribute)
    );
  }
}
