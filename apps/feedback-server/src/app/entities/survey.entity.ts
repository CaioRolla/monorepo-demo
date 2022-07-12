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

import {
  Account,
  CreateSurveyDto,
  DEFAULT_OPEN_QUESTION_TITLE,
  Identifier,
  Interview,
  Survey,
  SurveyStatus,
  SurveyType,
} from '@nui/feedback-shared/core';
import { AccountEntity } from './account.entity';
import { InterviewEntity } from './interview.entity';
import { IdentifierEntity } from './identifier.entity';

@Entity({ name: 'survey' })
export class SurveyEntity implements Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  desc?: string;

  @Column({ type: 'boolean', default: false })
  customLogo: boolean;

  @Column({ type: 'text', nullable: true })
  logoUrl?: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn()
  account: Account;

  @OneToMany(() => InterviewEntity, (interview) => interview.survey, {
    cascade: true,
  })
  interviews: Interview[];

  @OneToMany(() => IdentifierEntity, (id) => id.survey, { cascade: true })
  identifiers: Identifier[];

  @Column({
    type: 'varchar',
    length: 40,
    default: SurveyStatus.DRAFT,
  })
  status: SurveyStatus;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  type?: SurveyType;

  @Column({ type: 'varchar', length: 500, nullable: true })
  primaryQuestionTitle?: string;

  @Column({ type: 'text', nullable: true })
  template?: string;

  @Column({ type: 'boolean', default: false })
  redirectAfterCompleted: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  redirectAfterCompletedUrl?: string;

  @Column({ type: 'boolean', default: true })
  openQuestionEnabled: boolean;

  @Column({ type: 'boolean', nullable: true })
  openQuestionOptional?: boolean;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    default: DEFAULT_OPEN_QUESTION_TITLE,
  })
  openQuestionTitle?: string;

  @Column({ type: 'boolean', default: true })
  canAnswerMultipleTimes: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  public static fromCreateDto(createDto: CreateSurveyDto) {
    const survey = new SurveyEntity();
    survey.name = createDto.name;
    survey.desc = createDto.desc;
    return survey;
  }
}
