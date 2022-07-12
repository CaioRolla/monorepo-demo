import { IsArray, IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  ScheduleStatus,
  PatchScheduleDto as IPatchScheduleDto,
  ScheduleType,
  ScheduleMethod,
  ScheduleHeader,
  ScheduleResponseType,
} from '@nui/cron-shared/core';
import { IsSchedule, IsTimezone } from '@nui/shared-server/utils'

export class PatchScheduleDto implements IPatchScheduleDto {
  @ApiProperty()
  @IsUUID(4)
  id: string;

  @ApiProperty()
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  desc?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(500)
  @MinLength(1)
  @IsString()
  url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ScheduleType)
  type?: ScheduleType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ScheduleMethod)
  method?: ScheduleMethod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ScheduleStatus)
  status?: ScheduleStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ScheduleResponseType)
  responseType?: ScheduleResponseType;

  @ApiPropertyOptional()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  trigger?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsSchedule('schedule',{
    message: 'Invalid CRON schedule'
  })
  cronExpression?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  notifyOnError?: boolean;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  notifyEmail?: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => !!o.cronExpression)
  @IsTimezone('timezone', {
    message: 'Invalid Timezone',
  })
  timezone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  headers?: ScheduleHeader[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  payload?: string;
}
