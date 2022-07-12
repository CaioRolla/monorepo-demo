import { SurveyType } from '../../entities/survey.entity';

export interface StartInterviewResponseDto {
  interviewId: string;

  // Custom logo
  customLogo: boolean;

  logoUrl?: string;

  // Primary question

  type: SurveyType;

  primaryQuestionTitle?: string;

  // Redirect

  redirectAfterCompleted: boolean;

  redirectAfterCompletedUrl?: string;

  // Open Question

  openQuestionEnabled: boolean;

  openQuestionOptional?: boolean;

  openQuestionTitle?: string;

  isAnonymous: boolean;
}
