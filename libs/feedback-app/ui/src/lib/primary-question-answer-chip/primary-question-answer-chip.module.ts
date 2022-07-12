import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryQuestionAnswerChipComponent } from './primary-question-answer-chip.component';
import { ChipModule } from '@nui/shared-app/ui/chip';


@NgModule({
  declarations: [
    PrimaryQuestionAnswerChipComponent
  ],
  imports: [
    CommonModule,
    ChipModule
  ],
  exports: [
    PrimaryQuestionAnswerChipComponent
  ]
})
export class PrimaryQuestionAnswerChipModule { }
