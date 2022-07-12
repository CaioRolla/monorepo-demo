import { Interview } from '../../entities/interview.entity';
import { SurveyType } from '../../entities/survey.entity';

export interface SurveyStatsResponseDto {
  surveyName: string;

  score: number;

  average?: number;

  interviewsCount: number;

  lastInterviews: Interview[];

  type: SurveyType;

  hasOpenQuestion: boolean;

  openQuestionTitle?: string;

  // NPS

  detractorsCount?: number;

  detractorsPercentage?: number;

  passivesCount?: number;

  passivesPercentage?: number;

  promotersCount?: number;

  promotersPercentage?: number;

  // CSAT

  satisfiedCount?: number;

  unsatisfiedCount?: number;

  satisfiedPercentage?: number;

  unsatisfiedPercentage?: number;

  groupedPrimaryCount?: number[];

  groupedPrimaryPercentage?: number[];

  // Like

  likedCount?: number;

  dislikedCount?: number;

  likedPercentage?: number;

  dislikedPercentage?: number;

}
