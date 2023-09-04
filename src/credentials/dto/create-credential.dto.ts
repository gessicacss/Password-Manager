import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCredentialDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'my pretty title for my credential',
    description: 'title for credential',
  })
  title: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    example: 'mycredential.com.br/',
    description: 'my credentials url',
  })
  url: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'myusername',
    description: 'my credentials username',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'mpassword',
    description: 'my credentials password',
  })
  password: string;
}
