import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@nui/+auth/server';
import { GetAllQueryDto } from '../dtos/get-all-query.dto';
import { CreateIntegrationDto } from '../dtos/integration/create-integration.dto';
import { PatchIntegrationDto } from '../dtos/integration/patch-integration.dto';
import { IntegrationService } from '../services/integration.service';

@Controller({
  path: 'integration',
  version: '1',
})
export class IntegrationController {
  constructor(private readonly _integrationService: IntegrationService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  public async getAll(@Query() query: GetAllQueryDto, @Req() req) {
    return this._integrationService.getAll(query, req.user);
  }

  @Get(':integrationId')
  @UseGuards(JwtAuthGuard)
  public async get(@Param(`integrationId`) integrationId: string, @Req() req) {
    return this._integrationService.get(integrationId, req.user);
  }

  @Delete(':integrationId')
  @UseGuards(JwtAuthGuard)
  public async delete(
    @Param(`integrationId`) integrationId: string,
    @Req() req
  ) {
    return this._integrationService.delete(integrationId, req.user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async create(@Body() body: CreateIntegrationDto, @Req() req) {
    return this._integrationService.create(body, req.user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  public async patch(@Body() body: PatchIntegrationDto, @Req() req) {
    return this._integrationService.patch(body, req.user);
  }
}
