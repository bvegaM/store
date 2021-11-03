import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCostumerDto } from '../entities/dto/create_costumer.dto';
import { CostumersService } from '../service/costumers.service';

@Controller('costumers')
export class CostumersController {
  constructor(private readonly costumersService: CostumersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.costumersService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param() id: number) {
    return this.costumersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  save(@Body() payload: CreateCostumerDto) {
    return this.costumersService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param() id: number, @Body() payload: CreateCostumerDto) {
    return this.costumersService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param() id: number) {
    return this.costumersService.delete(id);
  }
}
