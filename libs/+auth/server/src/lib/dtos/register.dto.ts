import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { RegisterDto as IRegisterDto } from '@nui/+auth/core'

export class RegisterDto implements IRegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
