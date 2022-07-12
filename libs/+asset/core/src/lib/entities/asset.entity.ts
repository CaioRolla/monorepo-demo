import { AssetVariation } from './asset-variation.entity';

export interface Asset {
  id: string;

  url: string;

  originalname: string;

  mimeType: string;

  size: number;

  variations: AssetVariation[];

  orderIndex: number;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}
