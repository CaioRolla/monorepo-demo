import { GetAllIdentifiersQueryDto as IGetAllIdentifiersQueryDto } from '@nui/feedback-shared/core';
import { Type, Transform } from 'class-transformer';
import { IsOptional, IsArray, IsString } from 'class-validator';

import { GetAllQueryDto } from '../get-all-query.dto';

export class GetAllIdentifiersQueryDto
  extends GetAllQueryDto
  implements IGetAllIdentifiersQueryDto
{

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform((value) => value ? value.value.split(',') : null)
  select?: string[];
}
