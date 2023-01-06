export class CreateCategoryDto {
    readonly name: string
    readonly image: string
    readonly type: 'income' | 'expense'
}   