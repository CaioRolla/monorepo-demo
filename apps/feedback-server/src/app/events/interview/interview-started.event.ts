import { Interview } from '@nui/feedback-shared/core';

export class InterviewStartedEvent {
  public static event = 'interview.started';
  constructor(public interview: Interview) {}
}
