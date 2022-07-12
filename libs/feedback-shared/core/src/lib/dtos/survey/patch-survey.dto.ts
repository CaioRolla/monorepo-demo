import { SurveyStatus } from '../../entities/survey.entity';

export interface PatchSurveyDto {
  id: string;

  name?: string;

  desc?: string;

  status?: SurveyStatus;

  primaryQuestionTitle?: string;

  // Logo
  customLogo?: boolean;

  logoBase64?: string;

  // Template

  template?: string;

  // Redirect

  redirectAfterCompleted?: boolean;

  redirectAfterCompletedUrl?: string;

  // Open Question

  openQuestionEnabled?: boolean;

  openQuestionOptional?: boolean;

  openQuestionTitle?: string;

  // Can answer multiple times

  canAnswerMultipleTimes?: boolean;
}
