import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSpendDto } from './dto/create-spend.dto';
import { Spend } from './spend.model';
import { CategoryService } from './../category/category.service';
import { Category } from 'src/category/category.model';
import { User } from 'src/user/user.model';
import { UserService } from './../user/user.service';
import sequelize from 'sequelize';

@Injectable()
export class SpendService {
    constructor(@InjectModel(Spend) private spendRepository: typeof Spend, private categoryService: CategoryService,) { }

    async create(dto: CreateSpendDto, userId): Promise<Spend> {
        const category = await this.categoryService.getById(dto.categoryId)
        if (!category) {
            throw new NotFoundException('Category is not founded!')
        }
        const amount = category.type == 'income' ? Math.abs(dto.amount) : -Math.abs(dto.amount)
        const spend = await this.spendRepository.create<Spend>({ ...dto, amount, userId })
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
        return this.spendRepository.findAll({
            where: { userId },
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: Category
                }
            ],
            attributes: {
                exclude: ['updatedAt', 'userId', 'categoryId']
            }

        })
    }

    async getUserSpendsGroupedByCategory(userId) {
        const spends = await this.spendRepository.findAll({
            where: { userId },
            include: [
                {
                    model: Category
                }
            ],
            attributes: ['name', 'amount', 'categoryId'],
        })
        let groupedSpends = spends.reduce((acc, next) => {
            if (acc[next.category.name]) {
                acc[next.category.name].count++
                acc[next.category.name].total += next.amount
            } else {
                acc[next.category.name] = { count: 1, total: next.amount, name: next.category.name }
            }
            return acc
        }, {})
        let groupedSpendsArray = []
        for (const key in groupedSpends) {
            groupedSpendsArray.push(groupedSpends[key])
        }

        return groupedSpendsArray
    }

    async getUserSpendsByCategory(userId: number, categoryId: number) {
        return await this.spendRepository.findAll({
            where: { userId, categoryId },
            include: [
                {
                    model: Category
                }
            ],

        })

    }

}


