import { User } from '@nui/+auth/core';
import { Survey } from '@nui/feedback-shared/core';

export class SurveyCreatedEvent {
  public static event = 'survey.created';
  constructor(public survey: Survey, public user: User) {}
}
