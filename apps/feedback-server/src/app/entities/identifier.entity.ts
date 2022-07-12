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
  CreateIdentifierDto,
  Identifier,
  IdentifierValue,
  Interview,
  Survey,
} from '@nui/feedback-shared/core';
import { InterviewEntity } from './interview.entity';
import { SurveyEntity } from './survey.entity';
import { IdentifierValueEntity } from './identifier-value.entity';

@Entity({ name: 'identifier' })
export class IdentifierEntity implements Identifier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  key: string;

  @ManyToOne(() => SurveyEntity)
  @JoinColumn()
  survey: Survey;

  @Column({ type: 'boolean', default: false })
  primary: boolean;

  @OneToMany(() => IdentifierValueEntity, (idValue) => idValue.identifier)
  values: IdentifierValue[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  public static fromCreateDto(createDto: CreateIdentifierDto) {
    const identifier = new IdentifierEntity();
    identifier.key = createDto.key;
    identifier.primary = createDto.primary;
    return identifier;
  }
}
