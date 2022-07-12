import { AccountPlan } from "../../entities/account.entity";

export interface AccountUpgradeQueryDto {
    accountId: string;
    plan: AccountPlan;
}
