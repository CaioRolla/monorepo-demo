import {
  Body,
  Controller,
  Get,
  Req,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';

import { JwtAuthGuard } from '@nui/+auth/server';
import { AccountUpgradeQueryDto } from '../dtos/account/account-upgrade-query.dto';
import { AccountService } from '../services/account.service';

@Controller({
  path: 'account',
  version: '1',
})
export class AccountController {
  constructor(private readonly _accountService: AccountService) {}

  @Get('my')
  @UseGuards(JwtAuthGuard)
  public async getMy(@Req() req) {
    return this._accountService.getMy(req.user);
  }

  @Get('stripe-customer-portal')
  @UseGuards(JwtAuthGuard)
  public async getStripeCustomerPortalURL(@Req() req) {
    return this._accountService.getStripeCustomerPortalURL(req.user);
  }

  @Get('upgrade')
  public async upgrade(@Query() query: AccountUpgradeQueryDto, @Res() res) {
    const url = await this._accountService.upgrade(query);
    res.redirect(url);
  }
}
