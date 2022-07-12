import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@nui/+auth/server';
import { CreateIntegrationWebhookDto } from '../dtos/integration-webhook/create-integration-webhook.dto';
import { PatchIntegrationWebhookDto } from '../dtos/integration-webhook/patch-integration-webhook.dto';
import { IntegrationWebhookService } from '../services/integration-webhook.service';

@Controller({
  path: 'webhook',
  version: '1',
})
export class IntegrationWebhookController {
  constructor(
    private readonly _integrationWebhookService: IntegrationWebhookService
  ) {}

  @Get(':integrationWebhookId')
  @UseGuards(JwtAuthGuard)
  public async get(
    @Param(`integrationWebhookId`) integrationWebhookId: string,
    @Req() req
  ) {
    return this._integrationWebhookService.get(integrationWebhookId, req.user);
  }

  @Delete(':integrationWebhookId')
  @UseGuards(JwtAuthGuard)
  public async delete(
    @Param(`integrationWebhookId`) integrationWebhookId: string,
    @Req() req
  ) {
    return this._integrationWebhookService.delete(
      integrationWebhookId,
      req.user
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async create(@Body() body: CreateIntegrationWebhookDto, @Req() req) {
    return this._integrationWebhookService.create(body, req.user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  public async patch(@Body() body: PatchIntegrationWebhookDto, @Req() req) {
    return this._integrationWebhookService.patch(body, req.user);
  }
}
