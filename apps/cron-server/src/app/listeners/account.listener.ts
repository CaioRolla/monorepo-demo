import { Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';
import { Logger } from '@nui/shared-server/logging';
import { AccountUpgradedEvent } from '../events/account/account-upgraded.event';
import { UserAccountRepository } from '../repositories/user-account.repository';

@Injectable()
export class AccountListener {
  constructor(
    private readonly _logger: Logger,
    private readonly _userAccountRepository: UserAccountRepository
  ) {}

}
