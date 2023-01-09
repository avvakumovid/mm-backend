import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { SpendService } from './spend.service';
import { CreateSpendDto } from './dto/create-spend.dto';
import { Param, UseGuards, Query } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('spend')
export class SpendController {

    constructor(private spendService: SpendService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() dto: CreateSpendDto, @Request() req) {
        return this.spendService.create(dto, req.user.id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUserSpends(@Query('start') start, @Query('end') end, @Request() req) {
        return this.spendService.getUserSpends(req.user.id, start, end)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('date')
    getUserSpendsByDate(@Query('period') period: 'day' | 'week' | 'month' | 'year', @Query('date') date, @Request() req) {
        return this.spendService.getUserSpendsByDate(req.user.id, period, date)
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('/group')
    getUserSpendsGroupedByCategory(@Request() req) {
        return this.spendService.getUserSpendsGroupedByCategory(req.user.id)
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('/:categoryId')
    getUserSpendsByCategory(@Param('categoryId') categoryId: number, @Request() req) {
        return this.spendService.getUserSpendsByCategory(req.user.id, categoryId)
    }

    @Get('all')
    getAll() {
        return this.spendService.getAll()
    }




}
