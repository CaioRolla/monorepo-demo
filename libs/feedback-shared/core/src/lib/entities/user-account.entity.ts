import { User } from '@nui/+auth/core';
import { Account } from './account.entity';

export interface UserAccount {
  id: string;

  user: User;

  account: Account;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}
