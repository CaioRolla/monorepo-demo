import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IntegrationWebhook } from '@nui/feedback-shared/core';
import { IntegrationEntity } from './integration.entity';

@Entity({ name: 'integration_webhook' })
export class IntegrationWebhookEntity implements IntegrationWebhook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  event: string;

  @Column({ type: 'text', nullable: true })
  url: string;

  @ManyToOne(() => IntegrationEntity)
  @JoinColumn()
  integration: IntegrationEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
