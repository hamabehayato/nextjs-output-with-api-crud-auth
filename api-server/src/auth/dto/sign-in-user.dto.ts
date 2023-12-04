import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class SignInUserDto {
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
}
