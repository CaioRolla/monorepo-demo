import { AccountPlan, AccountPlanType } from "@nui/cron-shared/core";

export interface AccountUpgradeQueryDto {
    accountId: string;
    plan: AccountPlan;
    planType: AccountPlanType;
}