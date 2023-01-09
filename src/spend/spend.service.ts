import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSpendDto } from './dto/create-spend.dto';
import { Spend } from './spend.model';
import { CategoryService } from './../category/category.service';
import { Category } from 'src/category/category.model';
import { User } from 'src/user/user.model';
import { UserService } from './../user/user.service';
import sequelize from 'sequelize';
import { Op } from 'sequelize';

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

    async getUserSpends(userId: number, start?: string, end?: string,) {
        const where: sequelize.WhereOptions<Spend> = {
            userId,
        }
        if (start || end) {
            const dateEnd = end ? new Date(end) : new Date('2900-01-01')
            dateEnd.setDate(dateEnd.getDate() + 1)
            const dateStart = start ? new Date(start) : new Date('1900-01-01')
            where.createdAt = {
                [Op.between]: [start ?? '1900-01-01', dateEnd]
            }
        }
        return this.spendRepository.findAll({
            where,
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

    async getUserSpendsByDate(
        userId: number,
        period: 'day' | 'week' | 'month' | 'year' = 'year',
        date: string = Date.now().toLocaleString()
    ) {
        const where: sequelize.WhereOptions<Spend> = {
            userId,
        }
        const today = new Date()
        today.setHours(0, 0, 0, 0);

        switch (period) {
            case 'day': {
                const tomorrow = new Date(today.toLocaleDateString())
                where.createdAt = {
                    [Op.between]: [today, tomorrow.setDate(tomorrow.getDate() + 1)]
                }
            }
                break;
            case 'week': {
                const first = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
                const last = first + 6; // last day is the first day + 6
                const firstDay = new Date(today.setDate(first)).toUTCString();
                const lastDay = new Date(today.setDate(last)).toUTCString();
                where.createdAt = {
                    [Op.between]: [firstDay, lastDay]
                }
            }
            case 'month': {
                const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                where.createdAt = {
                    [Op.between]: [firstDay, lastDay]
                }
            }
            case 'year': {
                const currentYear = today.getFullYear();
                const firstDay = new Date(currentYear, 0, 1);
                const lastDay = new Date(currentYear, 11, 31);
                where.createdAt = {
                    [Op.between]: [firstDay, lastDay]
                }
            }
        }
        //TODO: add period
        const spends: any[] = await this.spendRepository.findAll({
            where,
            include: [
                {
                    model: Category,
                    attributes: []
                },

            ],
            group: period === 'day' ? ['createdAt', "category.type"] : [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt')), "category.id"],
            attributes:
                [
                    period === 'day' ? 'createdAt' : [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt')), 'createdAt'],
                    [sequelize.fn('SUM', sequelize.col('amount')), 'total'],
                    [sequelize.fn('CONCAT', sequelize.col('category.type')), 'type'],
                ],

        })

        const result = {}
        for (const spend of spends) {
            const createdAt = period === 'day' ? spend.dataValues.createdAt.toLocaleString() : spend.dataValues.createdAt.toLocaleDateString()
            if (!result[createdAt]) {
                result[createdAt] = {
                    createdAt: createdAt,
                    income: spend.dataValues.type === 'income' ? spend.dataValues.total : 0,
                    expense: spend.dataValues.type === 'expense' ? Math.abs(spend.dataValues.total) : 0
                }
            } else {
                if (spend.dataValues.type === 'income') {
                    result[createdAt].income += spend.dataValues.total
                } else {
                    result[createdAt].expense += Math.abs(spend.dataValues.total)
                }
            }
        }

        return Object.values(result)
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
    groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

}


