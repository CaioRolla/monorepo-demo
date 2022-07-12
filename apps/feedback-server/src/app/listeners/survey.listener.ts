import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { Logger } from '@nui/shared-server/logging';
import { SurveyCreatedEvent } from '../events/survey/survey-created.event';
import { BeewService } from '@nui/shared-server/beew';
import {
  ScheduleMethod,
  ScheduleResponseType,
  ScheduleType,
} from '@nui/cron-shared/core';
import { SurveyCreatedYesterdayEvent } from '../events/beew/survey-created-yesterday.event';

@Injectable()
export class SurveyListener {
  constructor(
    private readonly _logger: Logger,
    private readonly _beew: BeewService
  ) {}

  @OnEvent(SurveyCreatedEvent.event)
  public async handleSurveyCreatedEvent(payload: SurveyCreatedEvent) {
    if (process.env.NODE_ENV === 'production') {
      try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        this._beew.createSchedule({
          name: `${payload.survey.id} => SurveyCreatedYesterdayEvent`,
          url: process.env.BEEW_CALLBACK_URL,
          type: ScheduleType.ONE_TIME,
          method: ScheduleMethod.POST,
          trigger: tomorrow,
          notifyOnError: true,
          notifyEmail: 'caio.rolla@surveyx.co',
          headers: [],
          payload: JSON.stringify(
            new SurveyCreatedYesterdayEvent(payload.survey, payload.user)
          ),
          responseType: ScheduleResponseType.JSON,
        });
      } catch (error) {
        this._logger.error(
          'SurveyListener.handleSurveyCreatedEvent',
          error.message
        );
      }
    }
  }
}
