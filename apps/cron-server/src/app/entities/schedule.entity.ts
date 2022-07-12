import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
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

import {
  Account,
  Execution,
  ExecutionStatus,
  Schedule,
  ScheduleHeader,
  ScheduleMethod,
  ScheduleResponseType,
  ScheduleStats,
  ScheduleStatus,
  ScheduleType,
} from '@nui/cron-shared/core';
import { AccountEntity } from './account.entity';
import { ExecutionEntity } from './execution.entity';
import { ApiProperty } from '@nestjs/swagger';

const numberTransformer = {
  to(data: number): number {
    return data;
  },
  from(data: string): number {
    return parseFloat(data);
  },
};

export class ScheduleStatsEmbed implements ScheduleStats {
  @Column({
    type: 'bigint',
    default: 0,
    transformer: numberTransformer,
  })
  failedExecutions: number;

  @Column({ type: 'bigint', default: 0, transformer: numberTransformer })
  successfulExecutions: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastExecutionStatus: ExecutionStatus | null;
}

@Entity({ name: 'schedule' })
export class ScheduleEntity implements Schedule {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500, nullable: true })
  desc?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500 })
  url: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  type: ScheduleType;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  method: ScheduleMethod;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, default: ScheduleResponseType.TEXT })
  responseType: ScheduleResponseType;

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  trigger?: Date;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: true })
  cronExpression?: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  notifyOnError: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250, nullable: true })
  notifyEmail?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: true })
  timezone: string;

  @ApiProperty()
  headers: ScheduleHeader[];

  @ApiProperty()
  @Column({ type: 'text' })
  headersString: string;

  @ApiProperty()
  @Column({ type: 'text' })
  payload: string;

  @ManyToOne((account) => AccountEntity)
  @JoinColumn()
  account: Account;

  @OneToMany(() => ExecutionEntity, (execution) => execution.schedule)
  executions: Execution[];

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  status: ScheduleStatus;

  @Column(() => ScheduleStatsEmbed)
  stats: ScheduleStats;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public convertValues() {
    this.headersString = JSON.stringify(this.headers);
  }

  @AfterLoad()
  public unconvertValues() {
    this.headers = JSON.parse(this.headersString);
  }
}
