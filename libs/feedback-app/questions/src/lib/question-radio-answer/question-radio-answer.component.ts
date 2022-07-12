import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { QuestionRadioAnswerInputDirective } from './question-radio-answer.directive';

@Component({
  selector: 'nui-question-radio-answer',
  templateUrl: './question-radio-answer.component.html',
  styleUrls: ['./question-radio-answer.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionRadioAnswerComponent {
  @ContentChild(QuestionRadioAnswerInputDirective, { read: ElementRef })
  public readonly input?: ElementRef<HTMLInputElement>;

  @HostListener('click')
  public onClick(): void {

    if(!this.input?.nativeElement) {
      throw new Error('QuestionRadioAnswerComponent: input is not defined');
    }


    this.input.nativeElement.click();
  }
}
