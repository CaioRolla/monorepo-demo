import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  Headers,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtOrApiKeyAuthGuard } from '@nui/+auth/server';
import { ScheduleService } from '../../services/schedule.service';
import { CreateScheduleDto } from '../../dtos/schedule/create-schedule.dto';
import { PatchScheduleDto } from '../../dtos/schedule/patch-schedule.dto';
import { ScheduleEntity } from '../../entities/schedule.entity';

@ApiHeader({
  name: 'X-API-KEY',
  description: 'You Beew API key',
  required: true
})
@ApiTags('Schedule')
@Controller({
  path: 'schedule',
  version: '1',
})
export class ScheduleController {
  constructor(private readonly _scheduleService: ScheduleService) {}

  @Get(':scheduleId')
  @UseGuards(JwtOrApiKeyAuthGuard)
  public async get(@Req() req, @Param('scheduleId') scheduleId: string) {
    return this._scheduleService.get(scheduleId, req.user);
  }

  @Delete(':scheduleId')
  @UseGuards(JwtOrApiKeyAuthGuard)
  public async delete(@Req() req, @Param('scheduleId') scheduleId: string) {
    return this._scheduleService.delete(scheduleId, req.user);
  }

  @Post(':scheduleId/execute')
  @UseGuards(JwtOrApiKeyAuthGuard)
  @ApiExcludeEndpoint()
  public async execute(@Req() req, @Param('scheduleId') scheduleId: string) {
    return this._scheduleService.execute(scheduleId, req.user);
  }

  @Post()
  @UseGuards(JwtOrApiKeyAuthGuard)
  @ApiCreatedResponse({ type: ScheduleEntity  })
  public async create(@Req() req, @Body() body: CreateScheduleDto) {
    return this._scheduleService.create(body, req.user);
  }

  @Patch()
  @UseGuards(JwtOrApiKeyAuthGuard)
  @ApiOkResponse({ type: ScheduleEntity  })
  public async patch(@Req() req, @Body() body: PatchScheduleDto) {
    return this._scheduleService.patch(body, req.user);
  }
}
