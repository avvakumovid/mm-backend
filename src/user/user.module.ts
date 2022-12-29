import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Spend } from './../spend/spend.model';
import { UserSpends } from 'src/spend/user-spends.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Spend, UserSpends])
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule { }
