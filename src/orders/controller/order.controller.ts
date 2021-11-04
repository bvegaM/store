import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from '../order/entities/dto/create_order.dto';
import { UpdateOrderDto } from '../order/entities/dto/update_order.dto';
import { OrderService } from '../service/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.orderService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.delete(id);
  }
}
