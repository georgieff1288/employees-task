import { Inject, Injectable } from '@nestjs/common';
import { User } from "../../modules/auth/user.entity";
import {Refresh_Token} from "../../modules/auth/refresh-token.entity";
import {Op} from "sequelize";
const {
    REFRESH_TOKEN_LIFE
} = require('../../config');

function expirationDateGenerator(){
    let days = Number(REFRESH_TOKEN_LIFE.slice(0,-1));
    let currentDate = new Date()
    let expirationDate = new Date(currentDate.setDate(currentDate.getDate() + days));
    let expirationDateToString = expirationDate.getFullYear() + '-' + (expirationDate.getMonth() + 1) + '-' + expirationDate.getDate();
    return expirationDateToString;
}

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_REPOSITORY')
        private authRepository: typeof User,
        @Inject('TOKEN_REPOSITORY')
        private tokenRepository: typeof Refresh_Token,
    ) {
    }

    async findUserByEmail(email): Promise<User> {
        return await this.authRepository.findOne({where:{email: email}});
    }

    async findUserById(id): Promise<User> {
        return await this.authRepository.findOne({where:{id: id}});
    }

    async addToken(id, refreshToken): Promise<Refresh_Token> {

        let token = {
            user_id: id,
            token: refreshToken,
            expiration_date: expirationDateGenerator()
        }
        return await this.tokenRepository.create(token);
    }
    async findToken(refreshToken): Promise<Refresh_Token> {
        return await  this.tokenRepository.findOne({where: {token: refreshToken}});
    }

    async updateToken(oldToken, newToken): Promise<any> {
        let token = {
            token: newToken,
            expiration_date: expirationDateGenerator()
        }
        return await this.tokenRepository.update(token, {where:{token: oldToken}});
    }

    async deleteExpiredTokens(): Promise<number>{
        let date = new Date();
        date.setDate(date.getDate() - 1);
        return await this.tokenRepository.destroy({
            where:{
                expiration_date: {
                    [Op.lt]: date
                }
            }
        })
    }
}
