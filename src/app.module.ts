import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { CategoryModule } from './category/category.module';
import { SpendModule } from './spend/spend.module';
import { Spend } from './spend/spend.model';
import { Category } from './category/category.model';
import { UserSpends } from './spend/user-spends.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '11091997Ivan',
      database: 'test',
      models: [User, Spend, Category, UserSpends],
      autoLoadModels: true
    }),
    UserModule,
    CategoryModule,
    SpendModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
