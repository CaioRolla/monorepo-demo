import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { GetAllQueryDto } from '../get-all-query.dto';
import { GetAllExecutionQueryDto as IGetAllExecutionQueryDto } from '@nui/cron-shared/core';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllExecutionQueryDto extends GetAllQueryDto implements IGetAllExecutionQueryDto  {
    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => String)
    scheduleId?: string;
}