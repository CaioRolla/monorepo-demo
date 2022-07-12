import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ResendRegisterConfirmationDto as IResendRegisterConfirmationDto } from '@nui/+auth/core';

export class ResendRegisterConfirmationDto
  implements IResendRegisterConfirmationDto
{
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
