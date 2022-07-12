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
  AccountPlan,
  CreateSurveyDto,
  GetAllInterviewFilterDto,
  GetAllQueryDto,
  GetAllResponseDto,
  GetAllSurveyDto,
  GetSurveyFilterDataDto,
  PatchSurveyDto,
  SetupSurveyDto,
  Survey,
  SurveyStatsResponseDto,
  SurveyStatus,
  SurveyType,
} from '@nui/feedback-shared/core';
import { SurveyRepository } from '../repositories/survey.repository';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveyCreatedEvent } from '../events/survey/survey-created.event';
import { SurveySetupEvent } from '../events/survey/survey-setup.event';
import { SurveyUpdatedEvent } from '../events/survey/survey-updated.event';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { User } from '@nui/+auth/core';
import { InterviewRepository } from '../repositories/interview.repository';
import { IsNull, Not } from 'typeorm';
import { UploadService } from '@nui/shared-server/upload';

@Injectable()
export class SurveyService {
  constructor(
    private readonly _surveyRepository: SurveyRepository,
    private readonly _interviewRepository: InterviewRepository,
    private readonly _userAccountRepository: UserAccountRepository,
    private readonly _eventEmitter: EventEmitter2,
    private readonly _uploadService: UploadService,
    private readonly _logger: Logger
  ) {}

  public async getFilterData(
    user: User,
    surveyId?: string
  ): Promise<GetSurveyFilterDataDto> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const surveys = await this._surveyRepository.find({
      where: {
        ...(surveyId ? { id: surveyId } : {}),
        account,
      },
      relations: ['identifiers', 'identifiers.values'],
    });

    const identifiers = surveys.reduce((acc, survey) => {
      return [...acc, ...survey.identifiers];
    }, []);

    return {
      identifiers: identifiers
        .filter((id) => !id.primary)
        .map((identifier) => {
          const groupedValues = _.groupBy(identifier.values, 'value');
          return {
            key: identifier.key,
            values: Object.keys(groupedValues).map((value) => {
              return {
                value,
                interviewsCount: identifier.values.filter(
                  (v) => v.value === value
                ).length,
              };
            }),
          };
        }),
    };
  }

  public async stats(
    statsDto: GetAllInterviewFilterDto,
    user: User
  ): Promise<SurveyStatsResponseDto> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const survey = await this._surveyRepository.findOne({
      where: {
        id: statsDto.surveyId,
        account,
      },
    });

    if (!survey) {
      throw new NotFoundException(['Survey not found.']);
    }

    const interviews = await this._interviewRepository.find({
      where: { survey, primaryQuestionAnswer: Not(IsNull()), overQuota: false },
      order: { createdAt: 'DESC' },
      relations: ['identifierValues', 'identifierValues.identifier'],
    });

    const filteredInterviews = interviews.filter((interview) => {
      if (statsDto.identifiers.length === 0) {
        return true;
      }

      return statsDto.identifiers
        .map((id) => {
          const identifierValue = interview.identifierValues.find(
            (iv) => iv.identifier.key === id.key
          );

          return identifierValue
            ? id.values.includes(identifierValue.value)
            : false;
        })
        .reduce((prev, acc) => prev && acc, true);
    });

    let score: number;
    const surveyName = survey.name;
    const average = filteredInterviews.length
      ? Math.round(
          _.meanBy(filteredInterviews, (i) => i.primaryQuestionAnswer) || 0
        )
      : undefined;
    const interviewsCount = filteredInterviews.length;
    const lastInterviews = filteredInterviews
      .filter((i) => !!i.openQuestionAnswer)
      .slice(0, 5);

    let detractorsCount: number;
    let passivesCount: number;
    let promotersCount: number;

    let detractorsPercentage: number;
    let passivesPercentage: number;
    let promotersPercentage: number;

    if (survey.type === SurveyType.NPS) {
      detractorsCount = filteredInterviews.filter(
        (i) => i.primaryQuestionAnswer <= 6
      ).length;

      passivesCount = filteredInterviews.filter(
        (i) => i.primaryQuestionAnswer > 6 && i.primaryQuestionAnswer < 9
      ).length;

      promotersCount = filteredInterviews.filter(
        (i) => i.primaryQuestionAnswer >= 9
      ).length;

      detractorsPercentage = (detractorsCount / interviewsCount) * 100;
      passivesPercentage = (passivesCount / interviewsCount) * 100;
      promotersPercentage = (promotersCount / interviewsCount) * 100;

      score = Math.round(promotersPercentage - detractorsPercentage);
    }

    const groupedPrimary = _.groupBy(
      filteredInterviews,
      (i) => i.primaryQuestionAnswer
    );

    let satisfiedCount: number;
    let unsatisfiedCount: number;
    let satisfiedPercentage: number;
    let unsatisfiedPercentage: number;
    let groupedPrimaryCount: number[];
    let groupedPrimaryPercentage: number[];

    if (survey.type === SurveyType.CSAT) {
      satisfiedCount = filteredInterviews.filter(
        (i) => i.primaryQuestionAnswer >= 4
      ).length;

      unsatisfiedCount = filteredInterviews.filter(
        (i) => i.primaryQuestionAnswer < 4
      ).length;

      satisfiedPercentage = (satisfiedCount / interviewsCount) * 100;
      unsatisfiedPercentage = (unsatisfiedCount / interviewsCount) * 100;

      score = satisfiedCount / interviewsCount;

      groupedPrimaryCount = [
        groupedPrimary[1]?.length || 0,
        groupedPrimary[2]?.length || 0,
        groupedPrimary[3]?.length || 0,
        groupedPrimary[4]?.length || 0,
        groupedPrimary[5]?.length || 0,
      ];

      groupedPrimaryPercentage = [
        ((groupedPrimary[1]?.length || 0) / interviewsCount) * 100,
        ((groupedPrimary[2]?.length || 0) / interviewsCount) * 100,
        ((groupedPrimary[3]?.length || 0) / interviewsCount) * 100,
        ((groupedPrimary[4]?.length || 0) / interviewsCount) * 100,
        ((groupedPrimary[5]?.length || 0) / interviewsCount) * 100,
      ];
    }

    let likedCount: number;
    let dislikedCount: number;
    let likedPercentage: number;
    let dislikedPercentage: number;

    if (survey.type === SurveyType.LIKE) {
      likedCount = filteredInterviews.filter(
        (i) => i.primaryQuestionAnswer === 1
      ).length;

      dislikedCount = filteredInterviews.filter(
        (i) => i.primaryQuestionAnswer === 0
      ).length;

      score = likedCount / interviewsCount;

      likedPercentage = (likedCount / interviewsCount) * 100;
      dislikedPercentage = (dislikedCount / interviewsCount) * 100;

      groupedPrimaryCount = [
        groupedPrimary[0]?.length || 0,
        groupedPrimary[1]?.length || 0,
      ];

      groupedPrimaryPercentage = [
        ((groupedPrimary[0]?.length || 0) / interviewsCount) * 100,
        ((groupedPrimary[1]?.length || 0) / interviewsCount) * 100,
      ];
    }

    return {
      surveyName,
      score,
      average,
      interviewsCount,
      lastInterviews,
      type: survey.type,
      openQuestionTitle: survey.openQuestionTitle,

      detractorsCount,
      passivesCount,
      promotersCount,

      detractorsPercentage,
      passivesPercentage,
      promotersPercentage,

      satisfiedCount,
      unsatisfiedCount,

      satisfiedPercentage,
      unsatisfiedPercentage,
      groupedPrimaryCount,
      groupedPrimaryPercentage,

      hasOpenQuestion: lastInterviews.length > 0 || survey.openQuestionEnabled,

      likedCount,
      dislikedCount,

      likedPercentage,
      dislikedPercentage,
    };
  }

  public async get(surveyId: string, user: User): Promise<Survey> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const survey = await this._surveyRepository.findOne({
      id: surveyId,
      account,
    });

    if (!survey) {
      throw new NotFoundException(['Survey not found.']);
    }

    return survey;
  }

  public async delete(surveyId: string, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const survey = await this._surveyRepository.findOne({
      id: surveyId,
      account,
    });

    if (!survey) {
      throw new NotFoundException(['Survey not found.']);
    }

    this._surveyRepository.softRemove(survey);
  }

  public async getAll(
    query: GetAllQueryDto,
    user: User
  ): Promise<GetAllResponseDto<GetAllSurveyDto>> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const { page, take } = query;
    const q = query.q?.split(' ').join('%');

    const surveys = await this._surveyRepository.find({
      order: { createdAt: 'DESC' },
      where: query.q ? { name: q, account } : { account },
      relations: ['interviews'],
    });

    const totalAmount = surveys.length;
    const skip = page * take;
    const totalPages =
      totalAmount !== 0 ? (take !== -1 ? Math.ceil(totalAmount / take) : 1) : 0;

    const paginatedSurveys =
      take === -1 ? surveys : surveys.slice(skip, skip + take);

    return {
      totalAmount,
      totalPages,
      data: paginatedSurveys.map((survey) => {
        return {
          id: survey.id,
          name: survey.name,
          status: survey.status,
          type: survey.type,
          interviewsCount: survey.interviews.filter(
            (i) =>
              !i.overQuota &&
              i.primaryQuestionAnswer !== null &&
              i.primaryQuestionAnswer !== undefined
          ).length,
          createdAt: survey.createdAt,
          updatedAt: survey.updatedAt,
        };
      }),
    };
  }

  public async create(createDto: CreateSurveyDto, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account', 'user'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const surveyCount = await this._surveyRepository.count({ account });

    if (
      ![
        AccountPlan.SCALE_MONTHLY,
        AccountPlan.SCALE_YEARLY,
        AccountPlan.SCALE_LIFETIME,
      ].includes(account.plan) &&
      surveyCount > 1
    ) {
      this._logger.log(`🤷‍♀️ Account limit reached: ${account.id}`);
      throw new NotAcceptableException(['Account limit reached']);
    }

    const survey = SurveyEntity.fromCreateDto(createDto);

    survey.account = account;
    survey.status = SurveyStatus.DRAFT;

    const savedSurvey = await this._surveyRepository.save(survey);

    this._eventEmitter.emit(
      SurveyCreatedEvent.event,
      new SurveyCreatedEvent(savedSurvey, user)
    );

    return savedSurvey;
  }

  public async setup(setupDto: SetupSurveyDto, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account', 'user'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const survey = await this._surveyRepository.findOne({
      id: setupDto.id,
      account,
    });

    if (survey.status !== SurveyStatus.DRAFT) {
      throw new ConflictException(['Survey was already setup']);
    }

    survey.type = setupDto.type;
    survey.primaryQuestionTitle = setupDto.primaryQuestionTitle;
    survey.template = setupDto.template;
    survey.redirectAfterCompleted = setupDto.redirectAfterCompleted;
    survey.redirectAfterCompletedUrl = setupDto.redirectAfterCompletedUrl;
    survey.openQuestionEnabled = setupDto.openQuestionEnabled;
    survey.openQuestionOptional = setupDto.openQuestionOptional;
    survey.openQuestionTitle = setupDto.openQuestionTitle;
    survey.canAnswerMultipleTimes = setupDto.canAnswerMultipleTimes;
    survey.status = SurveyStatus.ACTIVE;
    survey.customLogo = setupDto.customLogo;

    if (setupDto.customLogo) {
      const format =
        setupDto.logoBase64.includes('image/jpeg') ||
        setupDto.logoBase64.includes('image/jpg')
          ? 'jpg'
          : 'png';
      const mime = format === 'jpg' ? 'image/jpg' : 'image/png';

      const buffer = Buffer.from(
        setupDto.logoBase64.replace(
          /^data:image\/(png|jpg|gif|jpeg);base64,/,
          ''
        ),
        'base64'
      );

      const { url } = await this._uploadService.uploadBuffer(
        buffer,
        `${slugify(survey.name)}-${Date.now()}.${format}`,
        mime
      );

      survey.logoUrl = url;
    } else {
      survey.logoUrl = null;
    }

    const savedSurvey = await this._surveyRepository.save(survey);

    this._eventEmitter.emit(
      SurveySetupEvent.event,
      new SurveySetupEvent(savedSurvey)
    );

    return savedSurvey;
  }

  public async patch(patchDto: PatchSurveyDto, user: User) {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account', 'user'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const survey = await this._surveyRepository.findOne({
      id: patchDto.id,
      account,
    });

    if (survey.status === SurveyStatus.DRAFT) {
      throw new BadRequestException(['Survey is not setup']);
    }

    if (patchDto.name) {
      survey.name = patchDto.name;
    }

    if (patchDto.desc) {
      survey.desc = patchDto.desc;
    }

    if (patchDto.status) {
      survey.status = patchDto.status;
    }

    if (patchDto.template) {
      survey.template = patchDto.template;
    }

    if (patchDto.redirectAfterCompletedUrl) {
      survey.redirectAfterCompletedUrl = patchDto.redirectAfterCompletedUrl;
    }

    if (patchDto.openQuestionTitle) {
      survey.openQuestionTitle = patchDto.openQuestionTitle;
    }

    if (patchDto.primaryQuestionTitle !== undefined) {
      survey.primaryQuestionTitle = patchDto.primaryQuestionTitle;
    }

    if (patchDto.openQuestionTitle !== undefined) {
      survey.openQuestionTitle = patchDto.openQuestionTitle;
    }

    if (patchDto.canAnswerMultipleTimes !== undefined) {
      survey.canAnswerMultipleTimes = patchDto.canAnswerMultipleTimes;
    }

    if (patchDto.openQuestionEnabled !== undefined) {
      survey.openQuestionEnabled = patchDto.openQuestionEnabled;
    }

    if (patchDto.openQuestionOptional !== undefined) {
      survey.openQuestionOptional = patchDto.openQuestionOptional;
    }

    if (patchDto.redirectAfterCompleted !== undefined) {
      survey.redirectAfterCompleted = patchDto.redirectAfterCompleted;
    }

    if (patchDto.customLogo !== undefined) {
      survey.customLogo = patchDto.customLogo;
    }

    if (patchDto.customLogo && patchDto.logoBase64) {
      const format =
        patchDto.logoBase64.includes('image/jpeg') ||
        patchDto.logoBase64.includes('image/jpg')
          ? 'jpg'
          : 'png';
      const mime = format === 'jpg' ? 'image/jpg' : 'image/png';

      const buffer = Buffer.from(
        patchDto.logoBase64.replace(
          /^data:image\/(png|jpg|gif|jpeg);base64,/,
          ''
        ),
        'base64'
      );

      const { url } = await this._uploadService.uploadBuffer(
        buffer,
        `${slugify(survey.name)}-${Date.now()}.${format}`,
        mime
      );

      survey.logoUrl = url;
    } else {
      survey.logoUrl = null;
    }

    const savedSurvey = await this._surveyRepository.save(survey);

    this._eventEmitter.emit(
      SurveyUpdatedEvent.event,
      new SurveyUpdatedEvent(savedSurvey)
    );

    return savedSurvey;
  }
}
