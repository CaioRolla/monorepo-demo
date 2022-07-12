import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Account, UserAccount } from '@nui/feedback-shared/core';
import { UserEntity } from '@nui/+auth/server';
import { AccountEntity } from './account.entity';
import { User } from '@nui/+auth/core';

@Entity({ name: 'user_account' })
export class UserAccountEntity implements UserAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: User;

  @OneToOne(() => AccountEntity, { cascade: true })
  @JoinColumn()
  account: Account;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
