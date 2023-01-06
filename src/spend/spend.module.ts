import { Module } from '@nestjs/common';
import { SpendService } from './spend.service';
import { SpendController } from './spend.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './../user/user.model';
import { Spend } from './spend.model';
import { Category } from './../category/category.model';
import { UserSpends } from './user-spends.model';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from './../category/category.module';
import { UserModule } from './../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Spend, Category, UserSpends,]), CategoryModule
  ],
  exports: [SpendService],
  providers: [SpendService],
  controllers: [SpendController]
})
export class SpendModule { }
