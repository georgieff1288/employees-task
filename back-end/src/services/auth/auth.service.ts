import { Inject, Injectable } from '@nestjs/common';
import { User } from "../../modules/auth/user.entity";

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_REPOSITORY')
        private authRepository: typeof User
    ) {
    }

    async getUser(email): Promise<User> {
        return await this.authRepository.findOne({where:{email: email}});
    }

    async addToken(email, token): Promise<any> {
        return await this.authRepository.update({token: token},{where:{email: email}});
    }
    async findToken(token): Promise<User> {
        return await  this.authRepository.findOne({where: {token: token}});
    }
}
