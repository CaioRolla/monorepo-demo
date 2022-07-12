import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  AfterContentInit,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

import { RadioCardItemInputDirective } from '../radio-card-item-input.directive';

@Component({
  selector: 'nui-radio-card-item',
  templateUrl: './radio-card-item.component.html',
  styleUrls: ['./radio-card-item.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioCardItemComponent implements AfterContentInit {
  @ContentChild(RadioCardItemInputDirective, { read: ElementRef })
  public readonly input?: ElementRef<HTMLInputElement>;

  constructor() {}

  public ngAfterContentInit(): void {}

  @HostListener('click')
  public onClick(): void {

    if(!this.input?.nativeElement) {
      throw new Error('RadioCardItemComponent: input is not defined');
    }


    this.input.nativeElement.click();
  }
}
