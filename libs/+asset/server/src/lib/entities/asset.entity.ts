import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Asset, AssetVariation } from '@nui/+asset/core';
import { AssetVariationEntity } from './asset-variation.entity';

@Entity({ name: 'asset' })
export class AssetEntity implements Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url: string;

  @Column({ type: 'varchar', length: 500 })
  originalname: string;

  @Column({ type: 'varchar', length: 500 })
  mimeType: string;

  @Column({ type: 'int' })
  size: number;

  @OneToMany(() => AssetVariationEntity, (variation) => variation.asset, {
    cascade: true,
  })
  variations: AssetVariation[];

  @Column({ type: 'int', default: 0 })
  orderIndex: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
