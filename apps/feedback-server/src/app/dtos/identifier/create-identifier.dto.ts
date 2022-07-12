import {
    IsBoolean,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  import {
    CreateIdentifierDto as ICreateIdentifierDto,
  } from '@nui/feedback-shared/core';
  
  export class CreateIdentifierDto implements ICreateIdentifierDto {
    @MaxLength(255)
    @MinLength(1)
    @IsString()
    key: string;
  
    @IsBoolean()
    primary: boolean;

    @IsUUID(4)
    surveyId: string;

  }
  