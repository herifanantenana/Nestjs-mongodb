import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUserSettingsDto {
  @IsOptional()
  @IsBoolean()
  receiveNotification?: boolean;

  @IsOptional()
  @IsBoolean()
  darkMode?: boolean;

  @IsOptional()
  @IsBoolean()
  receiceEmails?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveSMS?: boolean;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserSettingsDto)
  settings?: CreateUserSettingsDto;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  fullName?: string;
}
