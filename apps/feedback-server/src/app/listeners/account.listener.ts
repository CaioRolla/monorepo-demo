import { Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';
import { Logger } from '@nui/shared-server/logging';
import { AccountUpgradedEvent } from '../events/account/account-upgraded.event';
import { SurveyRepository } from '../repositories/survey.repository';
import { UserAccountRepository } from '../repositories/user-account.repository';

@Injectable()
export class AccountListener {
  constructor(
    private readonly _logger: Logger,
    private readonly _userAccountRepository: UserAccountRepository,
    private readonly _surveyRepository: SurveyRepository
  ) {}

  @OnEvent(AccountUpgradedEvent.event)
  public async handleAccountUpgradedEventOverQuotaUpdae(
    payload: AccountUpgradedEvent
  ) {
    try {
      const surveys = await this._surveyRepository.find({
        where: { account: payload.account },
        relations: ['interviews'],
      });

      surveys.forEach((survey) => {
        survey.interviews.map((interview) => {
          interview.overQuota = false;
        });
      });

      this._surveyRepository.save(surveys);
    } catch (error) {
      this._logger.error(
        `AccountListener.handleAccountUpgradedEventOverQuotaUpdae: Failed to remove over quota of interviews`,
        error
      );
    }
  }

}
