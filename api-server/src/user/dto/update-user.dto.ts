import { IsNotEmpty, MaxLength, IsEmail, IsTimeZone } from 'class-validator';
import { Timestamp } from 'typeorm';

export class UpdateUserDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string = '';

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string = '';

  @IsNotEmpty()
  @MaxLength(255)
  password: string = '';

  @IsTimeZone()
  createdAt: Timestamp;
}
