import { Survey } from '@nui/feedback-shared/core';

export class SurveyUpdatedEvent {
  public static event = 'survey.updated';
  constructor(public survey: Survey) {}
}
