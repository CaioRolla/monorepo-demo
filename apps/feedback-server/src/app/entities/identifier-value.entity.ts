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

import {
  Identifier,
  IdentifierValue,
  Interview,
} from '@nui/feedback-shared/core';
import { IdentifierEntity } from './identifier.entity';
import { InterviewEntity } from './interview.entity';

@Entity({ name: 'identifier_value' })
export class IdentifierValueEntity implements IdentifierValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  value: string;

  @ManyToOne(() => IdentifierEntity)
  @JoinColumn()
  identifier: Identifier;

  @ManyToOne(() => InterviewEntity)
  @JoinColumn()
  interview: Interview;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
