import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

import { OnEvent } from '@nestjs/event-emitter';
import { Logger } from '@nui/shared-server/logging';
import { ScheduleRepository } from '../repositories/schedule.repository';
import { ExecutionCreatedEvent } from '../events/execution/execution-created.event';
import { ExecutionStatus, isExecutionFailed, isExecutionSuccessful } from '@nui/cron-shared/core';

@Injectable()
export class ExecutionListener {
  constructor(
    private readonly _logger: Logger,
    private readonly _scheduleRepository: ScheduleRepository,
    private readonly _mailerService: MailerService
  ) {}

  @OnEvent(ExecutionCreatedEvent.event)
  public async handleScheduleCalculation(payload: ExecutionCreatedEvent) {
    try {
      const { execution } = payload;
      const schedule = await this._scheduleRepository.findOne({
        where: { id: payload.schedule.id },
      });

      schedule.stats.lastExecutionStatus = execution.status;

      if (isExecutionFailed(execution)) {
        schedule.stats.failedExecutions++;
      } else if (isExecutionSuccessful(execution)){
        schedule.stats.successfulExecutions++;
      }
      
      await this._scheduleRepository.save(schedule)

    } catch (error) {
      this._logger.error(`handleScheduleCalculation`, error);
    }
  }
}
