import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Logger } from '@nui/shared-server/logging';
import {
  CreateIdentifierDto,
  CreateSurveyDto,
  GetAllIdentifierDto,
  GetAllIdentifiersQueryDto,
  GetAllQueryDto,
  GetAllResponseDto,
  GetAllSurveyDto,
  PatchSurveyDto,
  SetupSurveyDto,
  Survey,
  SurveyStatus,
} from '@nui/feedback-shared/core';
import { SurveyRepository } from '../repositories/survey.repository';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { User } from '@nui/+auth/core';
import { IdentifierRepository } from '../repositories/identifier.repository';
import { IdentifierEntity } from '../entities/identifier.entity';

@Injectable()
export class IdentifierService {
  constructor(
    private readonly _surveyRepository: SurveyRepository,
    private readonly _identifierRepository: IdentifierRepository,
    private readonly _userAccountRepository: UserAccountRepository,
    private readonly _eventEmitter: EventEmitter2,
    private readonly _logger: Logger
  ) {}

  public async create(createDto: CreateIdentifierDto, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account', 'user'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const survey = await this._surveyRepository.findOne({
      id: createDto.surveyId,
      account,
    });

    if (!survey) {
      throw new NotFoundException(['Survey not found.']);
    }

    const existingIdentifier = await this._identifierRepository.findOne({
      where: {
        survey,
        key: createDto.key,
      },
      relations: ['survey'],
    });

    if (existingIdentifier) {
      throw new ConflictException(['Identifier already exists.']);
    }

    const identifier = IdentifierEntity.fromCreateDto(createDto);

    identifier.survey = survey;

    const savedIdentifier = await this._identifierRepository.save(identifier);

    return savedIdentifier;
  }

  public async getAll(
    surveyId: string,
    query: GetAllIdentifiersQueryDto,
    user: User
  ): Promise<GetAllResponseDto<GetAllIdentifierDto>> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const { page, take } = query;
    const q = query.q?.split(' ').join('%');

    const identifiers = await this._identifierRepository.find({
      order: { primary: 'DESC', createdAt: 'DESC' },
      where: query.q
        ? { key: q, survey: { id: surveyId } }
        : { survey: { id: surveyId } },
      relations: ['values', 'survey'],
    });

    const totalAmount = identifiers.length;
    const skip = page * take;
    const totalPages =
      totalAmount !== 0 ? (take !== -1 ? Math.ceil(totalAmount / take) : 1) : 0;
    const paginatedIdentifiers =
      take === -1 ? identifiers : identifiers.slice(skip, skip + take);

    return {
      totalAmount,
      totalPages,
      data: paginatedIdentifiers.map((identifier) => {
        return {
          id: identifier.id,
          key: identifier.key,
          valuesCount: identifier.values.length,
          values:
            query?.select && query.select.includes('values')
              ? identifier.values
              : undefined,
          primary: identifier.primary,
          createdAt: identifier.createdAt,
          updatedAt: identifier.updatedAt,
        };
      }),
    };
  }
}
