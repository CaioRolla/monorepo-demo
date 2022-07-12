import { User } from '@nui/+auth/core';
import { Survey } from '@nui/feedback-shared/core';
import { BeewEvent } from '@nui/shared-server/beew';

export class SurveyCreatedYesterdayEvent implements BeewEvent {
  public static event = 'survey.created.yesterday';
  public readonly event = 'survey.created.yesterday';
  constructor(public readonly survey: Survey, public readonly user: User) {}
}
