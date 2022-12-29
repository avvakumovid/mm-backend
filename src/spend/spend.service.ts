import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSpendDto } from './dto/create-spend.dto';
import { Spend } from './spend.model';
import { CategoryService } from './../category/category.service';

@Injectable()
export class SpendService {
    constructor(@InjectModel(Spend) private spendRepository: typeof Spend, private categoryService: CategoryService) { }

    async create(dto: CreateSpendDto) {
        const spend = await this.spendRepository.create(dto)
        const category = await this.categoryService.getById(dto.categoryId)

        return spend
    }

    async getAll() {
        return this.spendRepository.findAll({ include: { all: true } })
    }
}
