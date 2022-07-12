import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as _ from 'lodash';

import { slugify } from '@nui/shared/utils';
import { Logger } from '@nui/shared-server/logging';
import {
  CreateIntegrationDto,
  GetAllQueryDto,
  GetAllResponseDto,
  Integration,
  PatchIntegrationDto,
} from '@nui/feedback-shared/core';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { User } from '@nui/+auth/core';
import { InterviewRepository } from '../repositories/interview.repository';
import { UploadService } from '@nui/shared-server/upload';
import { IntegrationRepository } from '../repositories/integration.repository';
import { IntegrationEntity } from '../entities/integration.entity';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly _integrationRepository: IntegrationRepository,
    private readonly _interviewRepository: InterviewRepository,
    private readonly _userAccountRepository: UserAccountRepository,
    private readonly _eventEmitter: EventEmitter2,
    private readonly _uploadService: UploadService,
    private readonly _logger: Logger
  ) {}

  public async create(createDto: CreateIntegrationDto, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account', 'user'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const integration = new IntegrationEntity();

    integration.name = createDto.name;
    integration.desc = createDto.desc;
    integration.account = account;

    return await this._integrationRepository.save(integration);
  }

  public async patch(patchDto: PatchIntegrationDto, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account', 'user'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const integration = await this._integrationRepository.findOne({
      account,
      id: patchDto.id,
    });

    if (patchDto.name) {
      integration.name = patchDto.name;
    }

    if (patchDto.desc) {
      integration.desc = patchDto.desc;
    }

    return await this._integrationRepository.save(integration);
  }

  public async getAll(
    query: GetAllQueryDto,
    user: User
  ): Promise<GetAllResponseDto<Integration>> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const { page, take } = query;
    const q = query.q?.split(' ').join('%');

    const integrations = await this._integrationRepository.find({
      order: { createdAt: 'DESC' },
      where: query.q ? { name: q, account } : { account },
    });

    const totalAmount = integrations.length;
    const skip = page * take;
    const totalPages =
      totalAmount !== 0 ? (take !== -1 ? Math.ceil(totalAmount / take) : 1) : 0;

    const paginatedIntegrations =
      take === -1 ? integrations : integrations.slice(skip, skip + take);

    return {
      totalAmount,
      totalPages,
      data: paginatedIntegrations,
    };
  }

  public async delete(integrationId: string, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account', 'user'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const integration = await this._integrationRepository.findOne({
      account,
      id: integrationId,
    });

    if (!integration) {
      throw new NotFoundException(['Integration not found.']);
    }

    await this._integrationRepository.softRemove(integration);
  }

  public async get(integrationId: string, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account', 'user'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const integration = await this._integrationRepository.findOne({
      where: {
        account,
        id: integrationId,
      },
      relations: ['webhooks'],
    });

    if (!integration) {
      throw new NotFoundException(['Integration not found.']);
    }

    return integration;
  }
}
