import { Module } from '@nestjs/common';
import { CostumersController } from './costumer/controller/costumers.controller';
import { CostumersService } from './costumer/service/costumers.service';
import { UsersController } from './user/controller/users.controller';
import { UsersService } from './user/service/users.service';

@Module({
  controllers: [UsersController, CostumersController],
  providers: [UsersService, CostumersService],
})
export class UsersModule {}
