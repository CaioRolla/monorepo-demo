import { Identifier } from './identifier.entity';
import { Interview } from './interview.entity';

export interface IdentifierValue {
  id: string;

  value: string;

  identifier: Identifier;

  interview: Interview;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}
