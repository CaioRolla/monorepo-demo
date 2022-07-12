import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { AccountPlan, AccountPlanType, AccountUpgradeQueryDto as IAccountUpgradeQueryDto } from '@nui/cron-shared/core';

export class AccountUpgradeQueryDto implements IAccountUpgradeQueryDto  {
    @IsUUID(4)
    accountId: string;
    
    @IsEnum(AccountPlan)
    plan: AccountPlan;

    @IsEnum(AccountPlanType)
    planType: AccountPlanType;

}