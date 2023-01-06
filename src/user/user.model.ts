import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserSpends } from 'src/spend/user-spends.model';
import { Spend } from './../spend/spend.model';

interface UserCreationAttrs {
    firstName: string
    lastName: string
    email: string
    password: string
}

@Table({ tableName: 'User' })
export class User extends Model<User> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
    account: number

    @BelongsToMany(() => Spend, () => UserSpends)
    spends: Spend[]

}