import { IsDate, IsNotEmpty, IsObject } from 'class-validator';
import { Product } from 'src/products/product/entities/products.entity';
import { Costumer } from 'src/users/costumer/entities/costumer.entity';

export class CreateOrderDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  @IsObject()
  user: Costumer;
  @IsNotEmpty()
  products: Product[];
}
