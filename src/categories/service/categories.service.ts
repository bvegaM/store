import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { Category } from '../entities/categories.entity';
import { CreateCategoryDto } from '../entities/dto/create_category.dto';
import { UpdateCategoryDto } from '../entities/dto/update_category.dto';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'carnes',
      description: 'Carne de tipo roja',
    },
  ];

  findAll() {
    if (this.categories.length == 0) {
      throw new NotFoundException(`No existen datos de categorias`);
    }
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `La categoría ${id} no se encuentra registrada`,
      });
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    if (!payload) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `No hay los suficientes datos para crear la categoría`,
      });
    }
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return {
      status: HttpStatus.OK,
      message: `Categoría creada exitosamente`,
      body: newCategory,
    };
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (!category) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: `Categoría ${id} no encontrada`,
      };
    }
    const index = this.categories.findIndex((category) => category.id === id);
    this.categories[index] = {
      ...category,
      ...payload,
    };
    return {
      status: HttpStatus.OK,
      message: `Categoría ${id} modificada exitosamente`,
      body: this.categories[index],
    };
  }

  remove(id: number) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `No se ha encontrado la categoría ${id}`,
      });
    }
    this.categories.splice(index, 1);
    return {
      status: HttpStatus.NOT_FOUND,
      message: `Categoría ${id} eliminada exitosamente`,
    };
  }
}
