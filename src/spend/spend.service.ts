import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSpendDto } from './dto/create-spend.dto';
import { Spend } from './spend.model';
import { CategoryService } from './../category/category.service';
import { Category } from 'src/category/category.model';
import { User } from 'src/user/user.model';

@Injectable()
export class SpendService {
    constructor(@InjectModel(Spend) private spendRepository: typeof Spend, private categoryService: CategoryService) { }

    async create(dto: CreateSpendDto, userId): Promise<Spend> {
        const category = await this.categoryService.getById(dto.categoryId)
        if (!category) {
            throw new NotFoundException('Category is not founded!')
        }
        const spend = await this.spendRepository.create<Spend>({ ...dto, userId })
        return spend
    }

    async getAll() {
        return this.spendRepository.findAll(
            {
                include: [
                    { model: Category },
                    { model: User, attributes: { exclude: ['password'] } }
                ],
            })
    }

    async getUserSpends(userId) {
        return this.spendRepository.findAll({ where: { userId } })
    }
}
