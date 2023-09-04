import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EraseUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'myStrongp@ss1',
    description: 'password for user',
  })
  password: string;
}
