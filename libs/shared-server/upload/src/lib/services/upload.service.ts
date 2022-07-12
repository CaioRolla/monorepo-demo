import { Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';

import { slugify } from '@nui/shared/utils';
import { Logger } from '@nui/shared-server/logging';
import { SharedServerUploadConfig } from '../shared-server-upload.config';

@Injectable()
export class UploadService {
  constructor(
    private readonly _config: SharedServerUploadConfig,
    private readonly _logger: Logger,
    @InjectS3() private readonly _s3: S3
  ) {}

  public async uploadBuffer(buffer: Buffer, fileName: string, mimeType: string): Promise<any> {

    const params = {
      Bucket: this._config.s3BucketName,
      ContentType: mimeType,
      Key: fileName,
      Body: buffer,
      ACL:'public-read'
    };

    return await new Promise((resolve, reject) => {
      this._s3.upload(params, (err, data) => {
        if (err) {
          this._logger.error(err.message, err);
          reject(err.message);
        }
        resolve({
          url: data.Location,
        });
      });
    });
  }

  public async upload(file: Express.Multer.File): Promise<any> {
    const { originalname } = file;

    const params = {
      Bucket: this._config.s3BucketName,
      ContentType: file.mimetype,
      Key: slugify(`${originalname} ${Date.now()}`),
      Body: file.buffer,
      ACL:'public-read'
    };

    return await new Promise((resolve, reject) => {
      this._s3.upload(params, (err, data) => {
        if (err) {
          this._logger.error(err.message, err);
          reject(err.message);
        }
        resolve({
          url: data.Location,
        });
      });
    });
  }
}
