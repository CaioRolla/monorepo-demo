import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as _ from 'lodash';

import { Logger } from '@nui/shared-server/logging';
import {
  CreateIntegrationWebhookDto,
  PatchIntegrationWebhookDto,
} from '@nui/feedback-shared/core';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { User } from '@nui/+auth/core';
import { InterviewRepository } from '../repositories/interview.repository';
import { UploadService } from '@nui/shared-server/upload';
import { IntegrationWebhookRepository } from '../repositories/integration-webhook.repository';
import { IntegrationRepository } from '../repositories/integration.repository';
import { IntegrationWebhookEntity } from '../entities/integration-webhook.entity';

@Injectable()
export class IntegrationWebhookService {
  constructor(
    private readonly _integrationRepository: IntegrationRepository,
    private readonly _integrationWebhookRepository: IntegrationWebhookRepository,
    private readonly _interviewRepository: InterviewRepository,
    private readonly _userAccountRepository: UserAccountRepository,
    private readonly _eventEmitter: EventEmitter2,
    private readonly _uploadService: UploadService,
    private readonly _logger: Logger
  ) {}

  public async create(createDto: CreateIntegrationWebhookDto, user: User) {
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
        id: createDto.integrationId,
      },
      relations: ['webhooks', 'account'],
    });

    if (!integration) {
      throw new NotFoundException(['Integration not found.']);
    }

    const integrationWebhook = new IntegrationWebhookEntity();

    integrationWebhook.name = createDto.name;
    integrationWebhook.event = createDto.event;
    integrationWebhook.url = createDto.url;
    integrationWebhook.integration = integration;

    return await this._integrationWebhookRepository.save(integrationWebhook);
  }

  public async patch(patchDto: PatchIntegrationWebhookDto, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account', 'user'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const integrationWebhook = await this._integrationWebhookRepository.findOne(
      {
        where: {
          id: patchDto.id,
          integration: { account },
        },
        relations: ['integration', 'integration.account'],
      }
    );

    if (!integrationWebhook) {
      throw new NotFoundException(['Webhook not found.']);
    }

    if (patchDto.name) {
      integrationWebhook.name = patchDto.name;
    }

    if (patchDto.event) {
      integrationWebhook.event = patchDto.event;
    }

    if (patchDto.url) {
      integrationWebhook.url = patchDto.url;
    }

    return await this._integrationWebhookRepository.save(integrationWebhook);
  }

  public async get(integrationWebhookId: string, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account', 'user'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const integrationWebhook = await this._integrationWebhookRepository.findOne(
      {
        integration: { account },
        id: integrationWebhookId,
      }
    );

    if (!integrationWebhook) {
      throw new NotFoundException(['Webhook not found.']);
    }

    return integrationWebhook;
  }

  public async delete(integrationWebhookId: string, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account', 'user'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const integrationWebhook = await this._integrationWebhookRepository.findOne(
      {
        integration: { account },
        id: integrationWebhookId,
      }
    );

    if (!integrationWebhook) {
      throw new NotFoundException(['Webhook not found.']);
    }

    await this._integrationWebhookRepository.softRemove(integrationWebhook);
  }
}
