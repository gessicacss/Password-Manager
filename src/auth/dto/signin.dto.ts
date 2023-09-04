import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'myprettyemail@gmail.com',
    description: 'e-mail for user',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'mYstrongP@ss1',
    description: 'password for user',
  })
  password: string;
}
