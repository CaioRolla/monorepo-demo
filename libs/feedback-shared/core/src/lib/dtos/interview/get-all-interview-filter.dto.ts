export interface GetAllInterviewFilterIdentifierDto {
  key: string;
  values: string[];
}

export interface GetAllInterviewFilterDto {
  surveyId?: string;

  identifiers: GetAllInterviewFilterIdentifierDto[];
}
