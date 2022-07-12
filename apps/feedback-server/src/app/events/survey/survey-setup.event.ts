import { Survey } from '@nui/feedback-shared/core';

export class SurveySetupEvent {
  public static event = 'survey.setup';
  constructor(public survey: Survey) {}
}
