import { Injectable, NotFoundException } from '@nestjs/common';

import { AssetRepository } from '../repositories/asset.repository';
import { UploadService } from '@nui/shared-server/upload';
import { Asset } from '@nui/+asset/core';
import { AssetEntity } from '../..';

@Injectable()
export class AssetService {
  constructor(
    private readonly _assetRepository: AssetRepository,
    private readonly _uploadService: UploadService
  ) {}

  public async get(assetId: string): Promise<Asset> {
    const asset = await this._assetRepository.findOne({
      where: { id: assetId },
    });

    if (!asset) {
      throw new NotFoundException(['Asset not found.']);
    }

    return asset;
  }

  public async create(file: Express.Multer.File): Promise<Asset> {
    const asset = new AssetEntity();

    asset.mimeType = file.mimetype;
    asset.size = file.size;
    asset.originalname = file.originalname;

    const savedAsset = await this._assetRepository.save(asset);

    const { url } = await this._uploadService.uploadBuffer(
      file.buffer,
      `assets/${savedAsset.id}/${file.originalname}`,
      file.mimetype
    );

    savedAsset.url = url;

    return await this._assetRepository.save(asset);
  }
}
