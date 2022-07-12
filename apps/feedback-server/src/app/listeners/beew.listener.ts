import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { SurveyStatus } from '@nui/feedback-shared/core';
import { Logger } from '@nui/shared-server/logging';
import { join } from 'path';
import { SurveyCreatedYesterdayEvent } from '../events/beew/survey-created-yesterday.event';
import { SurveyRepository } from '../repositories/survey.repository';

@Injectable()
export class BeewListener {
  constructor(
    private readonly _logger: Logger,
    private readonly _mailerService: MailerService,
    private readonly _surveyRepository: SurveyRepository
  ) {}

  @OnEvent(SurveyCreatedYesterdayEvent.event)
  public async handleSurveyCreatedYesterdayEvent(
    payload: SurveyCreatedYesterdayEvent
  ) {
    try {
      const surveyId = payload.survey.id;
      const { user } = payload;

      const survey = await this._surveyRepository.findOne({
        where: { id: surveyId },
      });

      if (survey && survey.status === SurveyStatus.DRAFT) {
        await this._mailerService.sendMail({
          to: user.email,
          from: 'Caio Rolla <caio.rolla@surveyx.co>',
          subject: `Unfinished Survey: ${survey.name}`,
          template: join(__dirname, 'email-templates', 'survey-unfinished'),
          context: {
            userFirstName: user.displayName.split(' ')[0],
            surveyName: survey.name,
          },
        });
      }
    } catch (error) {
      this._logger.error(
        'BeewListener.handleSurveyCreatedYesterdayEvent',
        error.message
      );
    }
  }
}
