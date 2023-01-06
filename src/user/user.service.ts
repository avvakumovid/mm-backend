import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from '../../constants';
import { InjectModel } from '@nestjs/sequelize';
import { SpendService } from './../spend/spend.service';
import { Spend } from 'src/spend/spend.model';
import { CreateSpendDto } from './../spend/dto/create-spend.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private readonly userRepository: typeof User, private spendService: SpendService) { }

    async create(user: CreateUserDto): Promise<User> {
        return await this.userRepository.create<User>(user)
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll<User>({ include: [{ model: Spend, attributes: { exclude: ['UserSpends'] } }], })
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email } })
    }

    async findOneById(id: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } })
    }

    async addSpend(spendDto: CreateSpendDto, userId): Promise<Spend> {
        const user = await this.findOneById(userId)
        const spend = await this.spendService.create(spendDto, userId)
        const account = user.account + spend.amount
        user.account = +account.toFixed(2)
        await user.save()
        return spend
    }
}
