import { Inject, Injectable } from '@nestjs/common';
import { User } from "../../models/auth/user.entity";

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_REPOSITORY')
        private authRepository: typeof User
    ) {
    }

    async login(email): Promise<User> {
        return await this.authRepository.findOne({where:{email: email}});
    }
}
