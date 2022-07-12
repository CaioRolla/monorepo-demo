import { DynamicModule, Global, Module } from '@nestjs/common';

import { SharedServerUploadConfig } from './shared-server-upload.config';
import { UploadService } from './services/upload.service';
import { UploadController } from './controllers/upload.controller';

@Global()
@Module({
  controllers: [
    UploadController
  ],
  providers: [UploadService],
  exports: [UploadService],
})
export class SharedServerUploadModule {
  static forRoot(config: SharedServerUploadConfig): DynamicModule {
    return {
      module: SharedServerUploadModule,
      providers: [
        {
          provide: SharedServerUploadConfig,
          useValue: config,
        },
      ],
    };
  }
}
