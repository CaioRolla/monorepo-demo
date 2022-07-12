import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@nui/+auth/server';
import { IdentifierService } from '../services/identifier.service';
import { CreateIdentifierDto } from '../dtos/identifier/create-identifier.dto';
import { GetAllIdentifiersQueryDto } from '../dtos/identifier/get-all-identifier-query.dto';

@Controller({
  path: 'identifier',
  version: '1',
})
export class IdentifierController {
  constructor(private readonly _identifierService: IdentifierService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async create(@Body() body: CreateIdentifierDto, @Req() req) {
    return this._identifierService.create(body, req.user);
  }

  @Get('all/:surveyId')
  @UseGuards(JwtAuthGuard)
  public async getAllBySurvey(
    @Param(`surveyId`) surveyId: string,
    @Query() query: GetAllIdentifiersQueryDto,
    @Req() req
  ) {
    return this._identifierService.getAll(surveyId, query, req.user);
  }
}
