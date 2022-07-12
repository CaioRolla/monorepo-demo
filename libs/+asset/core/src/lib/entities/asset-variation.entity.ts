import { Asset } from "./asset.entity";

export interface AssetVariation {
  id: string;

  asset: Asset;

  key: string;

  url: string;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}
