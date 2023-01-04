import { Controller, Request } from '@nestjs/common';
import { Body, Post, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { DoesUserExist } from 'src/core/doesUserExist.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async auth(@Request() req) {
        return req.user

    }

    @UseGuards(DoesUserExist)
    @Post('singup')
    async singUp(@Body() user: CreateUserDto) {
        return await this.authService.create(user)
    }
}
