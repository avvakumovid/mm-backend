import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './../category/category.model';
import { User } from './../user/user.model';
import { Spend } from './spend.model';


@Table({ tableName: 'UserSpends', createdAt: false, updatedAt: false })
export class UserSpends extends Model<UserSpends> {

    @ApiProperty({ example: '1', description: 'uniq id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => User)
    @ApiProperty({ example: '1', description: 'user id' })
    @Column({ type: DataType.INTEGER })
    userId: number

    @ForeignKey(() => Spend)
    @ApiProperty({ example: '1', description: 'spend id' })
    @Column({ type: DataType.INTEGER })
    spendId: number

}