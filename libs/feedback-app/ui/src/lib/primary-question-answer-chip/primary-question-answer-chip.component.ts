import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { SurveyType } from '@nui/feedback-shared/core';

@Component({
  selector: 'nui-primary-question-answer-chip',
  templateUrl: './primary-question-answer-chip.component.html',
  styleUrls: ['./primary-question-answer-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryQuestionAnswerChipComponent {
  public readonly surveyType = SurveyType;

  public readonly CSATrange = ['😡', '😕', '😐', '😊', '😍'];

  public readonly satisfactionColorRange = ['#dc2626', '#d97706', '#fbbf24', '#34d399', '#10b981'];

  @Input() primaryQuestionAnswer?: number;

  @Input() type!: SurveyType;
}
