import { SurveyType } from '../../entities/survey.entity';

export interface SetupSurveyDto {
  id: string;

  // Logo
  customLogo: boolean;

  logoBase64?: string;

  // Primary question

  type: SurveyType;

  customPrimaryQuestionTitle: boolean;

  primaryQuestionTitle?: string;

  // Template

  template?: string;

  // Redirect

  redirectAfterCompleted: boolean;

  redirectAfterCompletedUrl?: string;

  // Open Question

  openQuestionEnabled: boolean;

  openQuestionOptional?: boolean;

  customOpenQuestionTitle: boolean;

  openQuestionTitle?: string;

  // Can answer multiple times

  canAnswerMultipleTimes: boolean;

}
