import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ example: 'Ivan', description: 'First name' })
    readonly firstName: string

    @ApiProperty({ example: 'Avvakumov', description: 'Last name' })
    readonly lastName: string

    @ApiProperty({ example: 'avvakumovid@gmail.com', description: 'email' })
    readonly email: string

    @ApiProperty({ example: '@322adasd1q', description: 'password' })
    readonly password: string
}