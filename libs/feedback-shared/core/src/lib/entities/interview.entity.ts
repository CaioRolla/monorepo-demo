import { IdentifierValue } from "./identifier-value.entity";
import { Survey } from "./survey.entity";

export interface Interview {
    id: string;

    survey: Survey;

    identifierValues: IdentifierValue[];

    primaryQuestionAnswer?: number;

    openQuestionTitle?: string;

    openQuestionAnswer?: string;


    url: string;

    overQuota: boolean;

    // Started and Finished
    startedAt?: Date;

    finishedAt?: Date;

    // Dates
    createdAt: Date;

    updatedAt?: Date;

    deletedAt?: Date;
}
