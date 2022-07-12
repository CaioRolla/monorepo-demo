import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ForgotPasswordDto as IForgotPasswordDto } from '@nui/+auth/core';

export class ForgotPasswordDto
  implements IForgotPasswordDto
{
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
