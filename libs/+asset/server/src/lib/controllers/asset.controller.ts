import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';

import { AssetService } from '../services/asset.service';

@Controller({
  path: 'asset',
  version: '1',
})
export class AssetController {
  constructor(private readonly _assetService: AssetService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async asset(@UploadedFile() file: Express.Multer.File) {
    return await this._assetService.create(file);
  }

  @Get(':assetId')
  public async get(@Param('assetId') assetId: string) {
    return this._assetService.get(assetId);
  }
}
