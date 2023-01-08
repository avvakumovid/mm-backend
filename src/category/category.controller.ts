import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Body, Get, Param, Post, Query } from '@nestjs/common/decorators';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.createCategory(dto)
    }

    @Get()
    getAll(@Query('type') type?: 'income' | 'expense') {
        return this.categoryService.getAll(type)
    }

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.categoryService.getById(id)
    }
}

