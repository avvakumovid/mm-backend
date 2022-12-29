import { IsNotEmpty } from 'class-validator';

export class CreateSpendDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    amount: string

    @IsNotEmpty()
    categoryId: number
}