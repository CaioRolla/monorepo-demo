import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Account, AccountPlan, AccountStatus } from '@nui/feedback-shared/core';

@Entity({ name: 'account' })
export class AccountEntity implements Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  status: AccountStatus;

  @Column({ type: 'varchar', length: 100, default: AccountPlan.UNSET })
  plan: AccountPlan;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stripeSubscriptionId?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stripeCustomerId?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
