import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import 'multer';

import { UploadService } from '../services/upload.service';

@Controller({
  path: 'upload',
  version: '1',
})
export class UploadController {

  constructor(private readonly _upload: UploadService){}
  
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return await this._upload.upload(file);
  }
}
