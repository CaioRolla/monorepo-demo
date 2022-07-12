import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { FinishInterviewDto } from '../dtos/interview/finish-interview.dto';
import { StartInterviewDto } from '../dtos/interview/start-interview.dto';
import { InterviewService } from '../services/interview.service';
import { JwtAuthGuard } from '@nui/+auth/server';
import { GetAllInterviewFilterDto } from '@nui/feedback-shared/core';

@Controller({
  path: 'interview',
  version: '1',
})
export class InterviewController {
  constructor(private readonly _interviewService: InterviewService) {}

  // TODO: GetAllInterviewFilterDto should be implemented at server level (it has no validation now)
  @Post('all')
  @UseGuards(JwtAuthGuard)
  public async getAll(@Body() body: GetAllInterviewFilterDto, @Req() req) {
    return this._interviewService.getAll(body, req.user);
  }

  @Post('start')
  public async start(@Body() body: StartInterviewDto) {
    return this._interviewService.start(body);
  }

  @Post('finish')
  public async finish(@Body() body: FinishInterviewDto) {
    return this._interviewService.finish(body);
  }
}
