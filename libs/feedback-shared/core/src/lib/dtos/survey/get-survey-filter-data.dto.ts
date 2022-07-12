export interface GetSurveyFilterDataIdentifierValueDto {
  value: string;
  interviewsCount: number;
}

export interface GetSurveyFilterDataIdentifierDto {
  key: string;
  values: GetSurveyFilterDataIdentifierValueDto[];
}

export interface GetSurveyFilterDataDto {
  identifiers: GetSurveyFilterDataIdentifierDto[];
}
