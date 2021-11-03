import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../entities/dto/create_product.dto';
import { UpdateProductDto } from '../entities/dto/update_product.dto';
import { Product } from '../entities/products.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      stock: 10,
      image: 'https://picsum.photos/200/300',
    },
  ];

  findAll(): Product[] {
    if (!this.products) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `No se encontraron productos`,
      });
    }
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `El producto ${id} no se encuentra registrado`,
      });
    }
    return product;
  }

  create(payload: CreateProductDto) {
    if (!payload) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `No hay los suficientes datos para crear al product`,
      });
    }
    const newProduct = {
      id: this.counterId++,
      ...payload,
    };
    this.products.push(newProduct);
    return {
      status: HttpStatus.OK,
      message: `usuario creado exitosamente`,
      body: newProduct,
    };
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return {
      status: HttpStatus.OK,
      message: `producto actualizado exitosamente`,
      body: this.products[index],
    };
  }

  remove(id: number) {
    const product = this.findOne(id);
    const index = this.products.findIndex((product) => product.id === id);
    this.products.splice(index, 1);
    return {
      status: HttpStatus.OK,
      message: `producto eliminado exitosamente`,
      body: product,
    };
  }
}
