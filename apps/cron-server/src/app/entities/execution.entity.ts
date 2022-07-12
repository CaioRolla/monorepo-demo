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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  Execution,
  ExecutionStatus,
  Schedule,
  ScheduleHeader,
  ScheduleMethod,
} from '@nui/cron-shared/core';
import { ScheduleEntity } from './schedule.entity';

@Entity({ name: 'execution' })
export class ExecutionEntity implements Execution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 14 })
  status: ExecutionStatus;

  @ManyToOne(() => ScheduleEntity)
  @JoinColumn()
  schedule: Schedule;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ type: 'varchar', length: 6 })
  method: ScheduleMethod;

  @Column({ type: 'timestamp', nullable: true })
  trigger?: Date;

  @Column({ type: 'varchar', length: 25, nullable: true })
  cronExpression?: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  timezone: string;

  headers: ScheduleHeader[];

  @Column({ type: 'text' })
  headersString: string;

  @Column({ type: 'text' })
  payload: string;

  @Column({ type: 'int', default: 0})
  responseTime: number;

  @Column({ type: 'text', nullable: true })
  responseData?: string;

  @Column({ type: 'int', nullable: true })
  responseStatus?: number;

  responseHeaders?: { [key: string]: string };

  @Column({ type: 'text', nullable: true })
  responseHeadersString?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public convertValues() {
    this.headersString = JSON.stringify(this.headers);
    this.responseHeadersString = this.responseHeaders
      ? JSON.stringify(this.responseHeaders)
      : null;
  }

  @AfterLoad()
  public unconvertValues() {
    this.headers = JSON.parse(this.headersString);
    this.responseHeaders = this.responseHeadersString
      ? JSON.parse(this.responseHeadersString)
      : null;
  }

  public static fromSchedule(schedule: Schedule): Execution {
    const execution = new ExecutionEntity();

    execution.schedule = schedule;
    execution.url = schedule.url;
    execution.method = schedule.method;
    execution.trigger = schedule.trigger;
    execution.cronExpression = schedule.cronExpression;
    execution.timezone = schedule.timezone;
    execution.headers = schedule.headers;
    execution.payload = schedule.payload;

    return execution;
  }
}
