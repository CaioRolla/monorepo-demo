import { Asset } from "@nui/+asset/core";

export enum AssetUploadStatus {
  PENDING = 'PENDING',
  UPLOADING = 'UPLOADING',
  COMPLETE = 'COMPLETE',
  EDIT = 'EDIT',
}

export interface FileData {
  fileName: string;
  progress: number;
  status: AssetUploadStatus;
  extension: string;

  loaded: number;
  total: number;

  asset?: Asset;
}
