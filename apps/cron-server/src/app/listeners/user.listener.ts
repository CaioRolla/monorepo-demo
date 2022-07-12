import { Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '@nui/+auth/server';
import { Logger } from '@nui/shared-server/logging';

@Injectable()
export class UserListener {
  constructor(
    private readonly _logger: Logger,
  ) {}


}
