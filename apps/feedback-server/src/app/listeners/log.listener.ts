import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { Logger } from '@nui/shared-server/logging';
import { UserCreatedEvent } from '@nui/+auth/server';
import { AccountUpgradedEvent } from '../events/account/account-upgraded.event';
import { SurveyCreatedEvent } from '../events/survey/survey-created.event';
import { SurveySetupEvent } from '../events/survey/survey-setup.event';
import { InterviewFinishedEvent } from '../events/interview/interview-finished.event';

@Injectable()
export class LogListener {
  constructor(private readonly _logger: Logger) {}

  @OnEvent(SurveyCreatedEvent.event)
  public async handleSurveyCreatedEvent(payload: SurveyCreatedEvent) {
    this._logger.log(`📎 A new survey was created: ${payload.survey.id}`);
  }

  @OnEvent(InterviewFinishedEvent.event)
  public async handleInterviewFinishedEvent(payload: InterviewFinishedEvent) {
    this._logger.log(`👒 A new Interview was finished: ${payload.interview.id}`);
  }

  @OnEvent(SurveySetupEvent.event)
  public async handleSurveySetupEvent(payload: SurveySetupEvent) {
    this._logger.log(`🎸 The survey ${payload.survey.name} is ready to rock! ${payload.survey.id}`);
  }

  @OnEvent(UserCreatedEvent.event)
  public async handleUserCreatedEvent(payload: UserCreatedEvent) {
    this._logger.log(`😊 A new user was created: ${payload.user.displayName} => ${payload.user.email}`);
  }

  @OnEvent(AccountUpgradedEvent.event)
  public async handleAccountUpgradedEvent(payload: AccountUpgradedEvent) {
    this._logger.log(`💸 A account was Upgraded: ${payload.account.id}`);
  }
}



