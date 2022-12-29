import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly lastName: string

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string
}