import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as _ from 'lodash';
import moment from 'moment';

import { User } from '@nui/+auth/core';
import {
  AccountPlan,
  CreateScheduleDto,
  Execution,
  ExecutionStatus,
  GetAllExecutionDto,
  getAllExecutionListFromExecutionList,
  GetAllExecutionQueryDto,
  headersToKeyValue,
  PatchScheduleDto,
  planAllowMoreExecutions,
  Schedule,
  ScheduleResponseType,
  ScheduleStatus,
} from '@nui/cron-shared/core';
import { GetAllResponseDto } from '@nui/shared/utils';

import { HttpService } from '@nestjs/axios';
import { Stripe } from '@nui/shared-server/stripe';
import { ScheduleRepository } from '../repositories/schedule.repository';
import { Logger } from '@nui/shared-server/logging';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountRepository } from '../repositories/account.repository';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { ExecutionRepository } from '../repositories/execution.repository';
import { ExecutionEntity } from '../entities/execution.entity';
import { In, MoreThanOrEqual } from 'typeorm';
import { ExecutionCreatedEvent } from '../events/execution/execution-created.event';

@Injectable()
export class ExecutionService {
  constructor(
    private readonly _stripe: Stripe,
    private readonly _scheduleRepository: ScheduleRepository,
    private readonly _executionRepository: ExecutionRepository,
    private readonly _logger: Logger,
    private readonly _eventEmitter: EventEmitter2,
    private readonly _accountRepository: AccountRepository,
    private readonly _userAccountRepository: UserAccountRepository,
    private readonly _http: HttpService
  ) {}

  public async get(executionId: string, user: User): Promise<Execution> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const execution = await this._executionRepository.findOne({
      where: { id: executionId },
    });

    if (!execution) {
      throw new NotFoundException(['Execution not found.']);
    }

    return execution;
  }

  public async getAll(
    query: GetAllExecutionQueryDto,
    user: User
  ): Promise<GetAllResponseDto<GetAllExecutionDto>> {
    const { page, take } = query;
    const skip = page * take;

    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const schedules = await this._scheduleRepository.find({
      where: {
        account,
        ...(query.scheduleId ? { id: query.scheduleId } : {}),
      },
    });

    const executions = await this._executionRepository.find({
      where: { schedule: { id: In(schedules.map((s) => s.id)) } },
      order: { createdAt: 'DESC' },
      ...(take === -1 ? {} : { take, skip }),
      relations: ['schedule'],
    });

    const totalAmount = await this._executionRepository.count({
      where: { schedule: { id: In(schedules.map((s) => s.id)) } },
    });

    const totalPages =
      totalAmount !== 0 ? (take !== -1 ? Math.ceil(totalAmount / take) : 1) : 0;

    return {
      totalAmount,
      totalPages,
      data: getAllExecutionListFromExecutionList(executions),
    };
  }

  public async execute(schedule: Schedule): Promise<Execution> {
    const firstday = moment().startOf('month').toDate();

    const sch = await this._scheduleRepository.findOne({
      where: { id: schedule.id },
      relations: ['account'],
    });

    if (!sch) {
      return;
    }

    const account = sch.account;

    const schedules = await this._scheduleRepository.find({ account });

    const executionsCount = await this._executionRepository.count({
      where: {
        schedule: {
          id: In(schedules.map((s) => s.id)),
        },
        createdAt: MoreThanOrEqual(firstday),
      },
    });

    if (!planAllowMoreExecutions(account, executionsCount)) {
      const execution = ExecutionEntity.fromSchedule(schedule);

      execution.status = ExecutionStatus.ACCOUNT_LIMIT;
      const savedExecution = await this._executionRepository.save(execution);

      this._eventEmitter.emit(
        ExecutionCreatedEvent.event,
        new ExecutionCreatedEvent(savedExecution, schedule)
      );

      return await this._executionRepository.findOne({
        where: { id: savedExecution.id },
      });
    }

    const execution = ExecutionEntity.fromSchedule(schedule);

    execution.status = ExecutionStatus.RUNNING;

    const savedExecution = await this._executionRepository.save(execution);

    const headers = headersToKeyValue(execution.headers);

    const startTime = Date.now();

    try {
      const res = await this._http
        .request({
          method: execution.method,
          responseType: schedule.responseType,
          headers,
          url: execution.url,
          data:
            schedule.responseType === ScheduleResponseType.JSON
              ? JSON.parse(execution.payload)
              : execution.payload,
        })
        .toPromise();

      try {
        savedExecution.responseData = JSON.stringify(res.data);
      } catch (error) {
        savedExecution.responseData = res.data;
      }
      savedExecution.status = ExecutionStatus.SUCCESS;
      savedExecution.responseStatus = res.status;
    } catch (error) {
      savedExecution.status = ExecutionStatus.FAILURE;
      savedExecution.responseData = error.response?.data.message;
      savedExecution.responseStatus = error.response?.data.statusCode;
    } finally {
      const endTime = Date.now();
      savedExecution.responseTime = endTime - startTime;
    }

    await this._executionRepository.save(savedExecution);

    this._eventEmitter.emit(
      ExecutionCreatedEvent.event,
      new ExecutionCreatedEvent(savedExecution, schedule)
    );

    return await this._executionRepository.findOne({
      where: { id: savedExecution.id },
    });
  }
}
