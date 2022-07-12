import { SurveyStatus, SurveyType } from '../../entities/survey.entity';

export interface GetAllSurveyDto {
  id: string;

  name: string;

  status: SurveyStatus;

  type: SurveyType;

  interviewsCount: number;
  
  createdAt: Date;
  
  updatedAt?: Date;
  
}
