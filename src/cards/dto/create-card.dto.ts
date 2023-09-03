import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  expDate: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  virtual: boolean;

  @IsNotEmpty()
  @IsString()
  type: string;
}
