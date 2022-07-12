import { IsEnum, IsUUID } from 'class-validator';

import { AccountPlan, AccountUpgradeQueryDto as IAccountUpgradeQueryDto } from '@nui/feedback-shared/core';

export class AccountUpgradeQueryDto implements IAccountUpgradeQueryDto  {
    @IsUUID(4)
    accountId: string;

    @IsEnum(AccountPlan)
    plan: AccountPlan;
}
