import { GetAllQueryDto } from '@nui/shared/utils';

export interface GetAllExecutionQueryDto extends GetAllQueryDto {
    scheduleId?: string;
}
