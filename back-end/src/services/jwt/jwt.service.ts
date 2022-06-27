import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from "../auth/auth.service";

const {
    SECRET,
    REFRESH_TOKEN_SECRET,
    TOKEN_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
    TOKEN_LIFE,
    REFRESH_TOKEN_LIFE
} = require('../../config')

@Injectable()
export class JwtService {
    constructor(private readonly auth: AuthService) {
    }
    createToken(email): any {
        let payloads = {
            email: email
        };
        let token = jwt.sign(payloads, SECRET, {expiresIn: TOKEN_LIFE});
        let refreshToken = jwt.sign(payloads, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_LIFE})
        return [token, refreshToken];
    }

    async validateToken(request): Promise<boolean> {
        let token = request.cookies[TOKEN_COOKIE_NAME];
        if(!token){
            return false
        }
        let decoded = jwt.verify(token, SECRET);
        let result;
        await this.auth.getUser(decoded.email)
            .then(res => result = res)
            .catch( err => {return false});
        if(result){
            return true;
        }
        return false;
    }
}
