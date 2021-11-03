import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number;
  @IsUrl()
  image: string;
}
