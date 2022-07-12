import { Process, Processor } from '@nestjs/bull';
import { Schedule } from '@nui/cron-shared/core';
import { Job } from 'bull';

import { Logger } from '@nui/shared-server/logging';
import { EXECUTION_QUEUE } from '../app.const';
import { ExecutionService } from '../services/execution.service';

@Processor(EXECUTION_QUEUE)
export class ExecutionProcessor {
  constructor(
    private readonly _executionService: ExecutionService,
    private readonly _logger: Logger
  ) {}

  @Process({ concurrency: 10 })
  async execute(job: Job<Schedule>) {
    try {
      await this._executionService.execute(job.data);
    } catch (error) {
      this._logger.error('ExecutionProcessor.execute', error);
    } finally {
      return {};
    }
  }
}
