import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'my pretty title for my card',
    description: 'title for card',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123458751548',
    description: 'my card number',
  })
  number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Joanna Majoras',
    description: 'my card name',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '254',
    description: 'my card security code',
  })
  code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '12/34',
    description: 'my card expiration date',
  })
  expDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1234',
    description: 'my card password',
  })
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'is my card virtual? its actually a boolean not a string!',
  })
  virtual: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'credit',
    description: 'is my card credit, debit or both?',
  })
  type: string;
}
