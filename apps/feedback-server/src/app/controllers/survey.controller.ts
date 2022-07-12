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

import { CreateSurveyDto } from '../dtos/survey/create-survey.dto';
import { PatchSurveyDto } from '../dtos/survey/patch-survey.dto';
import { SetupSurveyDto } from '../dtos/survey/setup-survey.dto';
import { SurveyService } from '../services/survey.service';
import { GetAllQueryDto } from '../dtos/get-all-query.dto';
import { JwtAuthGuard } from '@nui/+auth/server';
import { IdentifierService } from '../services/identifier.service';
import { GetAllInterviewFilterDto } from '@nui/feedback-shared/core';

@Controller({
  path: 'survey',
  version: '1',
})
export class SurveyController {
  constructor(
    private readonly _surveyService: SurveyService,
    private readonly _identifierService: IdentifierService
  ) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  public async getAll(@Query() query: GetAllQueryDto, @Req() req) {
    return this._surveyService.getAll(query, req.user);
  }

  // TODO: GetAllInterviewFilterDto should be implemented at server level (it has no validation now)
  @Post('stats')
  @UseGuards(JwtAuthGuard)
  public async stats(@Body() statsDto: GetAllInterviewFilterDto, @Req() req) {
    return this._surveyService.stats(statsDto, req.user);
  }

  @Get('filter-data')
  @UseGuards(JwtAuthGuard)
  public async getFilterData(@Query(`surveyId`) surveyId: string, @Req() req) {
    return this._surveyService.getFilterData(req.user, surveyId);
  }

  @Get(':surveyId')
  @UseGuards(JwtAuthGuard)
  public async get(@Param(`surveyId`) surveyId: string, @Req() req) {
    return this._surveyService.get(surveyId, req.user);
  }

  @Delete(':surveyId')
  @UseGuards(JwtAuthGuard)
  public async delete(@Param(`surveyId`) surveyId: string, @Req() req) {
    return this._surveyService.delete(surveyId, req.user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async create(@Body() body: CreateSurveyDto, @Req() req) {
    return this._surveyService.create(body, req.user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  public async patch(@Body() body: PatchSurveyDto, @Req() req) {
    return this._surveyService.patch(body, req.user);
  }

  @Patch('setup')
  @UseGuards(JwtAuthGuard)
  public async setup(@Body() body: SetupSurveyDto, @Req() req) {
    return this._surveyService.setup(body, req.user);
  }
}
