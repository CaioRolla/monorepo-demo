import { SurveyType } from "../../entities/survey.entity";

export interface GetAllInterviewDto {
    id: string;

    type: SurveyType

    primaryQuestionAnswer: number;

    openQuestionAnswer?: string;

    identifierValues: string[];

    // Started and Finished
    startedAt: Date;

    finishedAt?: Date;
}
