import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { CategoryModule } from './category/category.module';
import { SpendModule } from './spend/spend.module';
import { Spend } from './spend/spend.model';
import { Category } from './category/category.model';
import { UserSpends } from './spend/user-spends.model';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    SpendModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
