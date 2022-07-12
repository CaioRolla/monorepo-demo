import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetServerConfig } from './asset-server.config';
import { AssetController } from './controllers/asset.controller';
import { AssetVariationEntity } from './entities/asset-variation.entity';
import { AssetEntity } from './entities/asset.entity';
import { AssetRepository, AssetRepositoryProvider } from './repositories/asset.repository';
import { AssetService } from './services/asset.service';

@Module({
  imports: [TypeOrmModule.forFeature([AssetEntity, AssetVariationEntity])],
  controllers: [AssetController],
  providers: [AssetRepositoryProvider, AssetService],
  exports: [AssetRepository],
})
export class AssetServerModule {
  static forRoot(config: AssetServerConfig): DynamicModule {
    return {
      module: AssetServerModule,
      providers: [
        {
          provide: AssetServerConfig,
          useValue: config,
        },
      ],
    };
  }
}
