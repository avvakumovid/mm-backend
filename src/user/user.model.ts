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
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({ example: '1', description: 'uniq id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'Ivan', description: 'First name' })
    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string

    @ApiProperty({ example: 'Avvakumov', description: 'Last name' })
    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string

    @ApiProperty({ example: 'avvakumovid@gmail.com', description: 'email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({ example: '@322adasd1q', description: 'password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @BelongsToMany(() => Spend, () => UserSpends)
    user: Spend[]

}