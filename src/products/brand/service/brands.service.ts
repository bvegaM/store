import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto } from '../entities/dto/create_brand_dto';
import { UpdateBrandDto } from '../entities/dto/update_brand_dto';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'sonny',
      image: 'https://www.sony.com/logo.jpg',
    },
  ];

  findAll() {
    if (this.brands.length == 0) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `No existen marcas registradas`,
      });
    }
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `La marca ${id} no se encuentra registrada`,
      });
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    if (!payload) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `No hay los suficientes datos apra crear la marca`,
      });
    }
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return {
      status: HttpStatus.OK,
      message: `Marca creada exitosamente`,
      body: newBrand,
    };
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    const index = this.brands.findIndex((brand) => brand.id === id);
    this.brands[index] = {
      ...brand,
      ...payload,
    };
    return {
      status: HttpStatus.OK,
      message: `Marca ${id} modificada exitosamente`,
      body: this.brands[index],
    };
  }

  remove(id: number) {
    const brand = this.findOne(id);
    const index = this.brands.findIndex((brand) => brand.id === id);
    this.brands.splice(index, 1);
    return {
      status: HttpStatus.OK,
      message: `Marca ${id} eliminada exitosamente`,
      body: brand,
    };
  }
}
