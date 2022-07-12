import { IdentifierValue } from "../../entities/identifier-value.entity";

export interface GetAllIdentifierDto {
  id: string;

  key: string;

  primary: boolean;

  valuesCount: number;

  values?: IdentifierValue[];

  createdAt: Date;
}
