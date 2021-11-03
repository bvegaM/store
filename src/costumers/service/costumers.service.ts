import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Costumer } from '../entities/costumer.entity';
import { CreateCostumerDto } from '../entities/dto/create_costumer.dto';
import { UpdateCostumerDto } from '../entities/dto/update_costumer.dto';

@Injectable()
export class CostumersService {
  private counterId = 1;
  private costumers: Costumer[] = [
    {
      id: 1,
      firstName: 'Jairo',
      lastName: 'Sacoto',
      phone: '0985163132',
    },
  ];

  findAll() {
    if (this.costumers.length == 0) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `No existen clientes registrados`,
      });
    }
    return this.costumers;
  }

  findOne(id: number) {
    const costumer = this.costumers.find((costumer) => costumer.id === id);
    if (!costumer) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: `Cliente ${id} no encontrado`,
      };
    }
    return costumer;
  }

  create(payload: CreateCostumerDto) {
    if (!payload) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `No hay los suficientes datos apra crear al cliente`,
      });
    }
    this.counterId = this.counterId + 1;
    const newCostumer = {
      id: this.counterId,
      ...payload,
    };
    this.costumers.push(newCostumer);
    return {
      status: HttpStatus.OK,
      message: `Marca creada exitosamente`,
      body: newCostumer,
    };
  }

  update(id: number, payload: UpdateCostumerDto) {
    const costumer = this.findOne(id);
    if (!costumer) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: `Cliente ${id} no encontrado`,
      };
    }
    const index = this.costumers.findIndex((costumer) => costumer.id === id);
    const newCostumer = {
      ...costumer,
      ...payload,
    };
    return {
      status: HttpStatus.OK,
      message: `Cliente ${id} actualizado exitosamente`,
      body: newCostumer,
    };
  }

  delete(id: number) {
    const costumer = this.findOne(id);
    if (!costumer) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: `Cliente ${id} no encontrado`,
      };
    }
    const index = this.costumers.findIndex((costumer) => costumer.id === id);
    this.costumers.splice(index, 1);
    return {
      status: HttpStatus.OK,
      message: `Cliente ${id} eliminado exitosamente`,
    };
  }
}
