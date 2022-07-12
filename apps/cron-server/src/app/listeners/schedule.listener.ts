import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { MoreThan } from 'typeorm';

import { Logger } from '@nui/shared-server/logging';
import { ScheduleCreatedEvent } from '../events/schedule/schedule-created.event';
import { ScheduleUpdatedEvent } from '../events/schedule/schedule-updated.event';
import {
  Account,
  AccountPlan,
  Schedule,
  ScheduleStatus,
  ScheduleType,
} from '@nui/cron-shared/core';
import { EXECUTION_QUEUE } from '../app.const';
import { ScheduleRepository } from '../repositories/schedule.repository';

@Injectable()
export class ScheduleListener {
  constructor(
    @InjectQueue(EXECUTION_QUEUE) private readonly _executionQueue: Queue,
    private readonly _scheduleRepository: ScheduleRepository,
    private readonly _logger: Logger
  ) {
    // this._init();
  }

  // We only need that for migration!!!!!!!!!!!!!
  // private async _init() {
  //   this._logger.log(`STARTED MIGRATION OF CRON!`);
  //   const schedules = await this._scheduleRepository.find({
  //     where: [
  //       { type: ScheduleType.RECURRING, status: ScheduleStatus.ACTIVE },
  //       {
  //         type: ScheduleType.ONE_TIME,
  //         trigger: MoreThan(new Date()),
  //         status: ScheduleStatus.ACTIVE,
  //       },
  //     ],
  //     relations: ['account'],
  //   });

  //   await Promise.all(
  //     schedules.map(async (sch) => {
  //       await this._removeJob(sch);
  //       await this._addJob(sch, sch.account);
  //     })
  //   );

  //   this._logger.log(`FINISHED MIGRATION OF CRON!`);
  // }

  @OnEvent(ScheduleCreatedEvent.event)
  public async handleScheduleCreatedEvent(payload: ScheduleCreatedEvent) {
    try {
      const { schedule, account } = payload;

      await this._addJob(schedule, account);
    } catch (error) {
      this._logger.error(`handleScheduleCreatedEvent`, error);
    }
  }

  @OnEvent(ScheduleUpdatedEvent.event)
  public async handleScheduleUpdatedEvent(payload: ScheduleUpdatedEvent) {
    try {
      const { schedule, account } = payload;

      await this._removeJob(schedule);
      
      if (schedule.status === ScheduleStatus.ACTIVE) {
        await this._addJob(schedule, account);
      }
    } catch (error) {
      this._logger.error(`handleScheduleUpdatedEvent`, error);
    }
  }

  private async _addJob(schedule: Schedule, account: Account) {
    const isFree = [AccountPlan.FREE, AccountPlan.RAPID_API_FREE].includes(
      account.plan
    );
    const priority = isFree ? 2 : 1;

    await this._executionQueue.add(schedule, {
      priority,
      jobId: schedule.id,
      ...(schedule.type === ScheduleType.RECURRING
        ? {
            repeat: {
              cron: schedule.cronExpression,
              tz: schedule.timezone,
            },
          }
        : {
            delay: schedule.trigger.getTime() - new Date().getTime(),
          }),
    });
  }

  private async _removeJob(schedule: Schedule) {
    if (schedule.type === ScheduleType.RECURRING) {
      const jobs = await this._executionQueue.getRepeatableJobs();

      const job = jobs.find((j) => j.id.includes(schedule.id));

      if (job) {
        await this._executionQueue.removeRepeatableByKey(job.key);
      }
    } else {
      const job = await this._executionQueue.getJob(schedule.id);

      if (job) {
        await job.remove();
      }
    }
  }
}
