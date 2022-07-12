import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { ResetPasswordDto as IResetPasswordDto } from '@nui/+auth/core';

export class ResetPasswordDto
  implements IResetPasswordDto
{

  @IsUUID(4)
  @IsNotEmpty()
  confirmationToken: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
