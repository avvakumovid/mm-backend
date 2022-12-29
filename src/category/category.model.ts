import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Spend } from 'src/spend/spend.model';

interface CategoryCreationAttrs {
    name: string
    image: string
}

@Table({ tableName: 'Category', createdAt: false, updatedAt: false })
export class Category extends Model<Category, CategoryCreationAttrs> {

    @ApiProperty({ example: '1', description: 'uniq id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'Shopping', description: 'Category name' })
    @Column({ type: DataType.STRING, allowNull: false, unique: true, })
    name: string

    @ApiProperty({ example: 'image.png', description: 'Image' })
    @Column({ type: DataType.STRING, allowNull: false, })
    image: string

}