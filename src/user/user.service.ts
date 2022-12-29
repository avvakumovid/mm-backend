import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        return user
    }

    async getAllUser() {
        const users = await this.userRepository.findAll()
        return users
    }
}
