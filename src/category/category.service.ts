import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectModel(Category) private categoryRepository: typeof Category) { }

    async createCategory(dto: CreateCategoryDto) {
        return await this.categoryRepository.create(dto)
    }

    async getAll() {
        return await this.categoryRepository.findAll()
    }

    async getById(id: number) {
        return await this.categoryRepository.findOne({ where: { id } })
    }
}
