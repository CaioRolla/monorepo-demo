import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { GetAllQueryDto as IGetAllQueryDto } from '@nui/feedback-shared/core';

export class GetAllQueryDto implements IGetAllQueryDto {
  @IsOptional()
  @Type(() => Number)
  take? = 5;

  @IsOptional()
  @Type(() => Number)
  page? = 0;

  @IsOptional()
  @Type(() => String)
  q?: string;
}
