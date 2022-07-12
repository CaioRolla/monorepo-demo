import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Generated,
} from 'typeorm';

import { User, UserStatus } from '@nui/+auth/core';

@Entity({ name: 'user' })
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  apiKey: string;

  @Column({ type: 'varchar', length: 36, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'varchar', length: 36, nullable: true })
  confirmationToken: string | null;

  @Column({ type: 'varchar', length: 320, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  ref?: string;

  @Column({ type: 'simple-array' })
  permissions: string[];

  @Column({ type: 'varchar', length: 500 })
  displayName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  accessToken?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  rapidAPIusername?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  refreshToken?: string;

  @Column({ type: 'text', nullable: true })
  profilePicUrl?: string;

  @Column({ type: 'varchar', length: 320, nullable: true, select: false })
  password?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  givenName?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  familyName?: string;

  @Column({ type: 'boolean', default: false })
  isRapidAPIuser: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
