import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IdentifierValue, Interview, Survey } from '@nui/feedback-shared/core';
import { SurveyEntity } from './survey.entity';
import { IdentifierValueEntity } from './identifier-value.entity';

@Entity({ name: 'interview' })
export class InterviewEntity implements Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SurveyEntity)
  @JoinColumn()
  survey: Survey;

  @OneToMany(() => IdentifierValueEntity, (id) => id.interview, {
    cascade: true,
  })
  identifierValues: IdentifierValue[];

  @Column({ type: 'int', nullable: true })
  primaryQuestionAnswer?: number;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  openQuestionTitle?: string;

  @Column({ type: 'text', nullable: true })
  openQuestionAnswer?: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'boolean', default: false })
  overQuota: boolean;

  @Column({ type: 'timestamp', nullable: true })
  startedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
