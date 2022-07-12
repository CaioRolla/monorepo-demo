import {
  HttpService,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CronJob } from 'cron';
import moment from 'moment';

import { User } from '@nui/+auth/core';
import {
  CreateScheduleDto,
  Execution,
  ExecutionStatus,
  headersToKeyValue,
  PatchScheduleDto,
  planAllowMoreSchedules,
  Schedule,
  ScheduleStatus,
  ScheduleType,
} from '@nui/cron-shared/core';
import { Stripe } from '@nui/shared-server/stripe';
import { ScheduleEntity } from '../entities/schedule.entity';
import { ScheduleRepository } from '../repositories/schedule.repository';
import { Logger } from '@nui/shared-server/logging';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountRepository } from '../repositories/account.repository';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { ExecutionRepository } from '../repositories/execution.repository';
import { ExecutionService } from './execution.service';
import { ScheduleCreatedEvent } from '../events/schedule/schedule-created.event';
import { ScheduleUpdatedEvent } from '../events/schedule/schedule-updated.event';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly _stripe: Stripe,
    private readonly _scheduleRepository: ScheduleRepository,
    private readonly _executionRepository: ExecutionRepository,
    private readonly _logger: Logger,
    private readonly _eventEmitter: EventEmitter2,
    private readonly _accountRepository: AccountRepository,
    private readonly _userAccountRepository: UserAccountRepository,
    private readonly _executionService: ExecutionService
  ) {}

  public async delete(scheduleId: string, user: User): Promise<void> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const schedule = await this._scheduleRepository.findOne({
      where: { account, id: scheduleId },
    });

    if (!schedule) {
      throw new NotFoundException(['Schedule not found.']);
    }

    await this._scheduleRepository.softRemove(schedule);
  }

  public async get(scheduleId: string, user: User): Promise<Schedule> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const schedule = await this._scheduleRepository.findOne({
      where: { account, id: scheduleId },
    });

    if (!schedule) {
      throw new NotFoundException(['Schedule not found.']);
    }

    return schedule;
  }

  public async patch(
    patchDto: PatchScheduleDto,
    user: User
  ): Promise<Schedule> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const schedule = await this._scheduleRepository.findOne({
      where: { account, id: patchDto.id },
      relations: ['account'],
    });

    if (!schedule) {
      throw new NotFoundException(['Schedule not found.']);
    }

    schedule.status = 'status' in patchDto ? patchDto.status : schedule.status;
    schedule.responseType =
      'responseType' in patchDto
        ? patchDto.responseType
        : schedule.responseType;
    schedule.name = 'name' in patchDto ? patchDto.name : schedule.name;
    schedule.desc = 'desc' in patchDto ? patchDto.desc : schedule.desc;
    schedule.url = 'url' in patchDto ? patchDto.url : schedule.url;
    schedule.type = 'type' in patchDto ? patchDto.type : schedule.type;
    schedule.method = 'method' in patchDto ? patchDto.method : schedule.method;
    schedule.trigger =
      'trigger' in patchDto ? patchDto.trigger : schedule.trigger;
    schedule.cronExpression =
      'cronExpression' in patchDto
        ? patchDto.cronExpression
        : schedule.cronExpression;
    schedule.timezone =
      'timezone' in patchDto ? patchDto.timezone : schedule.timezone;
    schedule.headers =
      'headers' in patchDto ? patchDto.headers : schedule.headers;
    schedule.payload =
      'payload' in patchDto ? patchDto.payload : schedule.payload;
    schedule.notifyEmail =
      'notifyEmail' in patchDto ? patchDto.notifyEmail : schedule.notifyEmail;
    schedule.notifyOnError =
      'notifyOnError' in patchDto
        ? patchDto.notifyOnError
        : schedule.notifyOnError;

    const savedSchedule = await this._scheduleRepository.save(schedule);

    this._eventEmitter.emit(
      ScheduleUpdatedEvent.event,
      new ScheduleUpdatedEvent(savedSchedule, account)
    );

    return await this._scheduleRepository.findOne({
      where: { account, id: patchDto.id },
    });
  }

  public async create(
    createDto: CreateScheduleDto,
    user: User
  ): Promise<Schedule> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const schedulesCount = await this._scheduleRepository.count({ account });

    if (!planAllowMoreSchedules(account, schedulesCount)) {
      this._logger.log(`🤷‍♀️ Account limit reached: ${account.id}`);
      throw new NotAcceptableException(['Account limit reached']);
    }

    const schedule = new ScheduleEntity();

    schedule.status = ScheduleStatus.ACTIVE;
    schedule.account = account;

    schedule.name = createDto.name;
    schedule.desc = createDto.desc;
    schedule.url = createDto.url;
    schedule.type = createDto.type;
    schedule.method = createDto.method;
    schedule.trigger = createDto.trigger;
    schedule.cronExpression = createDto.cronExpression;
    schedule.timezone = createDto.timezone;
    schedule.headers = createDto.headers;
    schedule.payload = createDto.payload;
    schedule.notifyEmail = createDto.notifyEmail;
    schedule.notifyOnError = createDto.notifyOnError;
    schedule.responseType = createDto.responseType;

    const savedSchedule = await this._scheduleRepository.save(schedule);

    this._eventEmitter.emit(
      ScheduleCreatedEvent.event,
      new ScheduleCreatedEvent(savedSchedule, account)
    );

    return await this._scheduleRepository.findOne({
      where: { account, id: savedSchedule.id },
    });
  }

  public async execute(scheduleId: string, user: User): Promise<Execution> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const schedule = await this._scheduleRepository.findOne({
      where: { account, id: scheduleId },
      relations: ['account'],
    });

    if (!schedule) {
      throw new NotFoundException(['Schedule not found.']);
    }

    return await this._executionService.execute(schedule);
  }
}
