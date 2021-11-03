import { Module } from '@nestjs/common';
import { BrandsController } from './brand/controller/brands.controller';
import { BrandsService } from './brand/service/brands.service';
import { CategoriesController } from './category/controller/categories.controller';
import { CategoriesService } from './category/service/categories.service';
import { ProductsController } from './product/controller/products.controller';
import { ProductsService } from './product/service/products.service';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
})
export class ProductsModule {}
