import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, Model, Table, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { Category } from './../category/category.model';
import { User } from './../user/user.model';
import { UserSpends } from './user-spends.model';

interface SpendCreationAttrs {
    name: string
    image: string
    userId: number
}

@Table({ tableName: 'Spend' })
export class Spend extends Model<Spend, SpendCreationAttrs> {

    @ApiProperty({ example: '1', description: 'uniq id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'Shopping', description: 'Spend name' })
    @Column({ type: DataType.STRING, allowNull: false, })
    name: string

    @ApiProperty({ example: '2131', description: 'Amount' })
    @Column({ type: DataType.DECIMAL, allowNull: false, })
    amount: string

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, allowNull: false })
    categoryId: Category

    @BelongsTo(() => Category)
    category: Category

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;


}