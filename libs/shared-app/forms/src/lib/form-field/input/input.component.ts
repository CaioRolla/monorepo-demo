import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: '[nui-input]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: {
    class: 'input'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent extends BaseInputComponent {
  
  constructor(readonly elementRef: ElementRef) {
    super(elementRef);
  }

}
