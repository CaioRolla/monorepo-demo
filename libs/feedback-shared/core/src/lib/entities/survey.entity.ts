import { Account } from './account.entity';
import { Identifier } from './identifier.entity';
import { Interview } from './interview.entity';

export enum SurveyStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  STOPPED = 'STOPPED',
}

export enum SurveyType {
  NPS = 'NPS',
  CSAT = 'CSAT',
  STAR = 'STAR',
  LIKE = 'LIKE',
}

export interface Survey {
  id: string;

  name: string;

  desc?: string;

  account: Account;

  status: SurveyStatus;

  interviews: Interview[];

  identifiers: Identifier[];

  // Custom logo
  customLogo: boolean;

  logoUrl?: string;

  // Primary question

  type?: SurveyType;

  primaryQuestionTitle?: string;

  // Template

  template?: string;

  // Redirect

  redirectAfterCompleted: boolean;

  redirectAfterCompletedUrl?: string;

  // Open Question

  openQuestionEnabled: boolean;

  openQuestionOptional?: boolean;

  openQuestionTitle?: string;

  // Can answer multiple times

  canAnswerMultipleTimes: boolean;

  // Dates

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}

export const getQuestionByType = (type: SurveyType) => {
  return {
    [SurveyType.NPS]:
      'How likely is it that you would recommend our Newsletter to a friend or colleague?',
    [SurveyType.CSAT]:
      'How would you rate your experience with our Newsletter?',
    [SurveyType.STAR]:
      'How would you rate your experience with our Newsletter?',
    [SurveyType.LIKE]:
      'How would you rate your experience with our Newsletter?',
  }[type];
};
