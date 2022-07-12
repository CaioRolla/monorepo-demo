import {
  DEVELOPER_PLAN_SCHEDULE_LIMT,
  FREE_PLAN_EXECUTION_LIMT,
  FREE_PLAN_SCHEDULE_LIMT,
} from '../constants/plan.const';

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
}

export enum AccountPlan {
  FREE = 'FREE',
  SCALE = 'SCALE',
  RAPID_API_PRO = 'RAPID_API_PRO',
  RAPID_API_FREE = 'RAPID_API_FREE',

  DEVELOPER = 'DEVELOPER',
  UNLIMITED = 'UNLIMITED',
}

export enum AccountPlanType {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  LIFETIME = 'LIFETIME',
  NONE = 'NONE',
}

export interface Account {
  id: string;

  name?: string;

  phone?: string;

  status: AccountStatus;

  plan: AccountPlan;

  planType?: AccountPlanType;

  stripeSubscriptionId?: string;

  stripeCustomerId?: string;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}

export const planAllowMoreSchedules = (
  account: Account,
  schedulersCount: number
) => {
  if ([AccountPlan.FREE, AccountPlan.RAPID_API_FREE].includes(account.plan)) {
    return schedulersCount < FREE_PLAN_SCHEDULE_LIMT;
  }

  if ([AccountPlan.DEVELOPER].includes(account.plan)) {
    return schedulersCount < DEVELOPER_PLAN_SCHEDULE_LIMT;
  }

  return true;
};

export const planAllowMoreExecutions = (
  account: Account,
  executionsCount: number
) => {
  if ([AccountPlan.FREE, AccountPlan.RAPID_API_FREE].includes(account.plan)) {
    return executionsCount <= FREE_PLAN_EXECUTION_LIMT;
  }

  return true;
};
