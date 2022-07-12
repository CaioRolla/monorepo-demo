import { DynamicModule, HttpModule, Module } from '@nestjs/common';

import { SharedServerLoggingModule } from '@nui/shared-server/logging';
import { SitemapController } from './controllers/sitemap.controller';
import { SitemapService } from './services/sitemap.service';
import { SharedServerSitemapConfig } from './shared-server-sitemap.config';

@Module({
  imports:[
    HttpModule,
    SharedServerLoggingModule
  ],
  controllers: [SitemapController],
  providers: [SitemapService],
  exports: [SitemapService],
})
export class SharedServerSitemapModule {
  static forRoot(config: SharedServerSitemapConfig): DynamicModule {
    return {
      module: SharedServerSitemapModule,
      providers: [
        {
          provide: SharedServerSitemapConfig,
          useValue: config,
        },
      ],
    };
  }
}
