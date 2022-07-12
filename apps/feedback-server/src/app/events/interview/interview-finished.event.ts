import { Interview } from '@nui/feedback-shared/core';

export class InterviewFinishedEvent {
  public static event = 'interview.finished';
  constructor(public interview: Interview) {}
}
