import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Spend } from './../spend/spend.model';
import { UserSpends } from 'src/spend/user-spends.model';
import { usersProviders } from './users.providers';
import { SpendModule } from 'src/spend/spend.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    SpendModule
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule { }
