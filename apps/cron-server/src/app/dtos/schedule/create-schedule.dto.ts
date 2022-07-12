import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsRFC3339,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  CreateScheduleDto as ICreateScheduleDto,
  ScheduleHeader,
  ScheduleMethod,
  ScheduleResponseType,
  ScheduleType,
} from '@nui/cron-shared/core';
import { IsSchedule, IsTimezone } from '@nui/shared-server/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateScheduleDto implements ICreateScheduleDto {
  @ApiProperty()
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  desc?: string;

  @ApiProperty()
  @MaxLength(500)
  @MinLength(1)
  @IsString()
  url: string;

  @ApiProperty()
  @IsEnum(ScheduleType)
  type: ScheduleType;

  @ApiProperty()
  @IsEnum(ScheduleMethod)
  method: ScheduleMethod;

  @ApiProperty()
  @IsEnum(ScheduleResponseType)
  responseType: ScheduleResponseType;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  trigger?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsSchedule('schedule', {
    message: 'Invalid CRON schedule',
  })
  cronExpression?: string;

  @ApiProperty()
  @IsBoolean()
  notifyOnError: boolean;

  @ApiPropertyOptional()
  @IsEmail()
  @ValidateIf((o) => o.notifyOnError)
  @IsNotEmpty()
  notifyEmail?: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => !!o.cronExpression)
  @IsTimezone('timezone', {
    message: 'Invalid Timezone',
  })
  timezone?: string;

  @ApiProperty()
  @IsArray()
  headers: ScheduleHeader[];

  @ApiProperty()
  @IsString()
  payload: string;
}
