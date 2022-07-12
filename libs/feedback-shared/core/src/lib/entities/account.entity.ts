
export enum AccountStatus {
  ACTIVE = 'ACTIVE',
}

export enum AccountPlan {
  UNSET = 'UNSET',
  CANCELED = 'CANCELED',
  SCALE_MONTHLY = 'SCALE_MONTHLY',
  SCALE_YEARLY = 'SCALE_YEARLY',
  SCALE_LIFETIME = 'SCALE_LIFETIME',
}

export interface Account {
  id: string;

  status: AccountStatus;

  plan: AccountPlan;

  stripeSubscriptionId?: string;

  stripeCustomerId?: string;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}

