import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Category])
  ],
  exports: [CategoryService],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule { }
