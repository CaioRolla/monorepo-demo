import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  Account,
  AccountPlan,
  AccountPlanType,
  AccountStatus,
} from '@nui/cron-shared/core';

@Entity({ name: 'account' })
export class AccountEntity implements Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 320, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 320, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 100 })
  status: AccountStatus;

  @Column({ type: 'varchar', length: 100 })
  plan: AccountPlan;

  @Column({ type: 'varchar', length: 100, nullable: true })
  planType?: AccountPlanType;

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
