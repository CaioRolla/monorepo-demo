import { User } from '@nui/+auth/core';

export class UserCreatedEvent {
  public static event = 'user.created';
  constructor(public user: User) {}
}
