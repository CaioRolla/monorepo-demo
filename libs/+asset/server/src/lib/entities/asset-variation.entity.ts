import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Asset, AssetVariation } from '@nui/+asset/core';
import { AssetEntity } from './asset.entity';

@Entity({ name: 'asset_variation' })
export class AssetVariationEntity implements AssetVariation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AssetEntity)
  @JoinColumn()
  asset: Asset;

  @Column({ type: 'varchar', length: 500 })
  key: string;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
