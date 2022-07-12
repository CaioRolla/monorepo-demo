import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Account, Integration } from '@nui/feedback-shared/core';
import { IntegrationWebhookEntity } from './integration-webhook.entity';
import { AccountEntity } from './account.entity';

@Entity({ name: 'integration' })
export class IntegrationEntity implements Integration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  desc?: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn()
  account: Account;

  @OneToMany(() => IntegrationWebhookEntity, (interview) => interview.integration, { cascade: true })
  webhooks: IntegrationWebhookEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
