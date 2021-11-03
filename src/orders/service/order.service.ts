import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../order/entities/dto/create_order.dto';
import { UpdateOrderDto } from '../order/entities/dto/update_order.dto';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class OrderService {
  private counterId = 1;
  private orders: Order[] = [
    {
      id: this.counterId,
      date: new Date(),
      user: {
        id: 1,
        firstName: 'Jairo',
        lastName: 'Sacoto',
        phone: '0985163132',
      },
      products: [
        {
          id: 1,
          name: 'Product 1',
          price: 100,
          stock: 10,
          image: 'https://picsum.photos/200/300',
        },
      ],
    },
  ];

  findAll(): Order[] {
    if (this.orders.length == 0) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'No hay oredenes registradas',
      });
    }
    return this.orders;
  }

  findOne(id: number): Order {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'No se encontro la orden',
      });
    }
    return order;
  }

  create(payload: CreateOrderDto) {
    if (!payload) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'No hay los suficientes datos para crear la orden',
      });
    }
    this.counterId = this.counterId + 1;
    const newOrder = {
      id: this.counterId,
      ...payload,
    };
    this.orders.push(newOrder);
    return {
      status: HttpStatus.OK,
      message: `Orden creada exitosamente`,
      body: newOrder,
    };
  }

  update(id: number, payload: UpdateOrderDto) {
    const order = this.findOne(id);
    const index = this.orders.findIndex((order) => order.id === id);
    this.orders[index] = {
      ...order,
      ...payload,
    };
    return {
      status: HttpStatus.OK,
      message: `Orden actualizada exitosamente`,
      body: this.orders[index],
    };
  }

  delete(id: number) {
    const order = this.findOne(id);
    const index = this.orders.findIndex((order) => order.id === id);
    this.orders.splice(index, 1);
    return {
      status: HttpStatus.OK,
      message: `Orden eliminada exitosamente`,
      body: order,
    };
  }
}
