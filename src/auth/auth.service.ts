import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string) {
        const user = await this.userService.findOneByEmail(email)

        if (!user) {
            return null
        }

        const match = await this.comparePassword(pass, user.password)
        if (!match) {
            return null
        }
        const { password, ...result } = user['dataValues'];
        return result;
    }

    public async login(user) {
        const token = await this.generateToken(user)

        return { user, token }
    }

    public async auth(user) {
        const token = await this.generateToken(user)
        return { user, token }
    }
    public async create(user) {
        const pass = await this.hashPassword(user.password)

        const newUser = await this.userService.create({ ...user, password: pass })

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newUser['dataValues'];

        // generate token
        const token = await this.generateToken(result);

        // return the user and the token
        return { user: result, token };
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword)
        return match
    }

}
