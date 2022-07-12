import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericQuestionComponent } from './generic-question/generic-question.component';
import { QuestionRadioAnswerComponent } from './question-radio-answer/question-radio-answer.component';
import { QuestionRadioAnswerInputDirective } from './question-radio-answer/question-radio-answer.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    GenericQuestionComponent,
    QuestionRadioAnswerComponent,
    QuestionRadioAnswerInputDirective
  ],
  exports: [
    GenericQuestionComponent,
    QuestionRadioAnswerComponent,
    QuestionRadioAnswerInputDirective
  ],
})
export class FeedbackAppQuestionsModule {}
