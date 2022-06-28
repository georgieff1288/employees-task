import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from "../auth/auth.service";

const {
    SECRET,
    REFRESH_TOKEN_SECRET,
    TOKEN_LIFE,
    REFRESH_TOKEN_LIFE
} = require('../../config')

@Injectable()
export class JwtService {
    constructor(private readonly auth: AuthService) {
    }
    createTokens(email): any {
        let payloads = {
            email: email
        };
        let token = jwt.sign(payloads, SECRET, {expiresIn: TOKEN_LIFE});
        let refreshToken = jwt.sign(payloads, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_LIFE})
        return [token, refreshToken];
    }

    async validateToken(request): Promise<boolean> {
        let authHeader = request.headers.authorization;
        if(authHeader){
            let token = authHeader.split(' ')[1];
            let decoded = jwt.verify(token, SECRET);
            let result;
            await this.auth.getUser(decoded.email)
                .then(res => result = res)
                .catch( () => {return false});
            return !!result
        }
        return false;
    }
}
