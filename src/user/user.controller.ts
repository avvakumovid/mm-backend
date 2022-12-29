import { Body, Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Post, UseGuards } from '@nestjs/common/decorators';
import { CreateSpendDto } from './../spend/dto/create-spend.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('spend')
    addSpend(@Body() dto: CreateSpendDto, @Request() req) {
        return this.userService.addSpend(dto, req.user.id)
    }

}   
