import { BadRequestException, Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '@nui/+auth/core';
import * as _ from 'lodash';

import {
  AccountPlan,
  FinishInterviewDto,
  GetAllInterviewDto,
  GetAllInterviewFilterDto,
  GetAllResponseDto,
  StartInterviewDto,
  StartInterviewResponseDto,
  SurveyStatus,
} from '@nui/feedback-shared/core';
import { Logger } from '@nui/shared-server/logging';
import { extractQueryValuesFromUrl } from '@nui/shared/utils';
import { In, IsNull, Not } from 'typeorm';
import { IdentifierValueEntity } from '../entities/identifier-value.entity';
import { InterviewEntity } from '../entities/interview.entity';
import { InterviewFinishedEvent } from '../events/interview/interview-finished.event';
import { InterviewStartedEvent } from '../events/interview/interview-started.event';
import { InterviewRepository } from '../repositories/interview.repository';
import { SurveyRepository } from '../repositories/survey.repository';
import { UserAccountRepository } from '../repositories/user-account.repository';

@Injectable()
export class InterviewService {
  constructor(
    private readonly _surveyRepository: SurveyRepository,
    private readonly _interviewRepository: InterviewRepository,
    private readonly _userAccountRepository: UserAccountRepository,

    private readonly _eventEmitter: EventEmitter2,
    private readonly _logger: Logger
  ) {}

  public async getAll(
    getDto: GetAllInterviewFilterDto,
    user: User
  ): Promise<GetAllResponseDto<GetAllInterviewDto>> {
    const { account } = await this._userAccountRepository.findOne({
      where: { user },
      relations: ['account'],
    });

    if (!account) {
      throw new NotFoundException(['Account not found.']);
    }

    const surveys = await this._surveyRepository.find({
      where: {
        ...(getDto.surveyId ? { id: getDto.surveyId } : {}),
        account,
      },
    });

    if (getDto.surveyId && !surveys) {
      throw new NotFoundException(['Survey not found.']);
    }

    const interviews = await this._interviewRepository.find({
      where: {
        survey: { id: In(surveys.map((s) => s.id)) },
        primaryQuestionAnswer: Not(IsNull()),
        overQuota: false,
      },
      order: { createdAt: 'DESC' },
      relations: ['identifierValues', 'identifierValues.identifier', 'survey'],
    });

    const filteredInterviews = interviews.filter((interview) => {
      if (getDto.identifiers.length === 0) {
        return true;
      }

      return getDto.identifiers
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

    const totalAmount = filteredInterviews.length;
    const totalPages = 1;

    return {
      totalAmount,
      totalPages,
      data: filteredInterviews.map((interview) => {
        return {
          id: interview.id,
          primaryQuestionAnswer: interview.primaryQuestionAnswer,
          openQuestionAnswer: interview.openQuestionAnswer,
          startedAt: interview.startedAt,
          finishedAt: interview.finishedAt,
          type: interview.survey.type,
          identifierValues: _.orderBy(
            interview.identifierValues.map((idv) => idv.value)
          ),
        };
      }),
    };
  }

  public async finish(finishDto: FinishInterviewDto) {
    const interview = await this._interviewRepository.findOne(
      finishDto.interviewId
    );

    if (!interview) {
      throw new NotFoundException(['Interview not found']);
    }

    if (interview.finishedAt) {
      throw new BadRequestException(['Interview already finished']);
    }

    interview.primaryQuestionAnswer = finishDto.primaryQuestionAnswer;
    interview.openQuestionAnswer = finishDto.openQuestionAnswer;
    interview.finishedAt = new Date();

    const savedInterview = await this._interviewRepository.save(interview);

    this._eventEmitter.emit(
      InterviewFinishedEvent.event,
      new InterviewFinishedEvent(savedInterview)
    );

    return interview;
  }

  public async start(
    startDto: StartInterviewDto
  ): Promise<StartInterviewResponseDto> {
    const survey = await this._surveyRepository.findOne({
      where: { id: startDto.surveyId },
      relations: ['identifiers', 'account'],
    });

    if (!survey || survey.status !== SurveyStatus.ACTIVE) {
      throw new NotFoundException(['Survey not found']);
    }

    const primaryIdentifier = survey.identifiers.find((id) => id.primary);

    const accountSurveys = await this._surveyRepository.find({ where: { account: survey.account } })

    const interviewCount = await this._interviewRepository.count({ where: { survey: { id: In(accountSurveys.map((s) => s.id)) } } });

    if (!survey.canAnswerMultipleTimes && !primaryIdentifier) {
      throw new BadRequestException([
        'Survey does not have a primary identifier',
      ]);
    }

    const params = extractQueryValuesFromUrl(startDto.url);

    const interview = new InterviewEntity();

    interview.survey = survey;
    interview.primaryQuestionAnswer = startDto.primaryQuestionAnswer;
    interview.url = startDto.url;
    interview.overQuota = false;

    if (survey.account.plan === AccountPlan.CANCELED) {
      interview.overQuota = true;
    }

    if (survey.account.plan === AccountPlan.UNSET && interviewCount >= 100) {
      interview.overQuota = true;
    }

    if (!survey.canAnswerMultipleTimes && params) {
      const primaryIdentifierValue = params[primaryIdentifier.key];

      if (!primaryIdentifierValue) {
        throw new BadRequestException(['Primary identifier not provided']);
      }
    }

    interview.identifierValues = survey.identifiers
      .map((identifier) => {
        const identifierValue = new IdentifierValueEntity();
        identifierValue.identifier = identifier;
        identifierValue.value = params[identifier.key];
        return identifierValue;
      })
      .filter((idValue) => !!idValue.value);

    const savedInterview = await this._interviewRepository.save(interview);

    this._eventEmitter.emit(
      InterviewStartedEvent.event,
      new InterviewStartedEvent(savedInterview)
    );

    return {
      interviewId: savedInterview.id,
      type: survey.type,
      primaryQuestionTitle: survey.primaryQuestionTitle,
      redirectAfterCompleted: survey.redirectAfterCompleted,
      redirectAfterCompletedUrl: survey.redirectAfterCompletedUrl,
      openQuestionEnabled: survey.openQuestionEnabled,
      openQuestionOptional: survey.openQuestionOptional,
      openQuestionTitle: survey.openQuestionTitle,
      isAnonymous: !primaryIdentifier || !params[primaryIdentifier.key],
      customLogo: survey.customLogo && !!survey.logoUrl,
      logoUrl: survey.logoUrl,
    };
  }
}
