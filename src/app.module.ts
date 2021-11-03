import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/controllers/products.controller';
import { ProductsService } from './products/service/products.service';
import { CategoriesController } from './categories/controllers/categories.controller';
import { CategoriesService } from './categories/service/categories.service';
import { UsersService } from './users/service/users.service';
import { CostumersService } from './costumers/service/costumers.service';
import { CostumersController } from './costumers/controller/costumers.controller';

import { BrandsService } from './brands/service/brands.service';
import { BrandsController } from './brands/controller/brands.controller';
import { UsersController } from './users/controller/users.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    CostumersController,
    BrandsController,
    UsersController,
  ],
  providers: [
    AppService,
    ProductsService,
    CategoriesService,
    UsersService,
    CostumersService,
    BrandsService,
  ],
})
export class AppModule {}
