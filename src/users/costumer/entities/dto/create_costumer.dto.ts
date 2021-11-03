import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCostumerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsPhoneNumber()
  phone: string;
}
