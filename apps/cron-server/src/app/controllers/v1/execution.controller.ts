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
  Query,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { JwtOrApiKeyAuthGuard } from '@nui/+auth/server';
import { GetAllExecutionQueryDto } from '../../dtos/execution/get-all-execution-query.dto';
import { ExecutionService } from '../../services/execution.service';

@ApiHeader({
  name: 'X-API-KEY',
  description: 'You Beew API key',
  required: true
})
@ApiTags('Execution')
@Controller({
  path: 'execution',
  version: '1',
})
export class ExecutionController {
  constructor(private readonly _executionService: ExecutionService) {}

  @Get('all')
  @UseGuards(JwtOrApiKeyAuthGuard)
  public async getAll(@Req() req, @Query() query: GetAllExecutionQueryDto) {
    return this._executionService.getAll(query, req.user);
  }

  @Get(':executionId')
  @UseGuards(JwtOrApiKeyAuthGuard)
  public async getMy(@Req() req, @Param('executionId') executionId: string) {
    return this._executionService.get(executionId, req.user);
  }
}
