import { PartialType } from '@nestjs/mapped-types';
import { CreateCostumerDto } from './create_costumer.dto';

export class UpdateCostumerDto extends PartialType(CreateCostumerDto) {}
