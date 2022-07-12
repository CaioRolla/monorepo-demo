import { IdentifierValue } from './identifier-value.entity';
import { Survey } from './survey.entity';

export interface Identifier {
  id: string;

  key: string;

  primary: boolean;

  survey: Survey;

  values: IdentifierValue[];

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}
