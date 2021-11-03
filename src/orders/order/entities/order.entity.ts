import { Product } from 'src/products/product/entities/products.entity';
import { Costumer } from 'src/users/costumer/entities/costumer.entity';

export class Order {
  id: number;
  date: Date;
  user: Costumer;
  products: Product[];
}
