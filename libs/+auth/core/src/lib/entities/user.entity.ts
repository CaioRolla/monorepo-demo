export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING_CONFIRMATION = 'PENDING_CONFIRMATION',
}

export interface User {
  id: string;

  apiKey: string;

  confirmationToken: string | null;

  email?: string;

  displayName: string;

  status: UserStatus;

  ref?: string;

  permissions: string[];

  password?: string;

  rapidAPIusername?: string;
  
  isRapidAPIuser: boolean;

  accessToken?: string;

  refreshToken?: string;

  profilePicUrl?: string;

  givenName?: string;

  familyName?: string;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date;

}
