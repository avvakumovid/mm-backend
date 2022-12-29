import { Body, Controller, Get, Post } from '@nestjs/common';
import { SpendService } from './spend.service';
import { CreateSpendDto } from './dto/create-spend.dto';

@Controller('spend')
export class SpendController {

    constructor(private spendService: SpendService) { }

    @Post()
    create(@Body() dto: CreateSpendDto) {
        return this.spendService.create(dto)
    }

    @Get()
    getAll() {
        return this.spendService.getAll()
    }
}
