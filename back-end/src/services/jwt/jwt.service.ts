import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from "../auth/auth.service";

const {
    SECRET,
    REFRESH_TOKEN_SECRET,
    TOKEN_LIFE,
    REFRESH_TOKEN_LIFE
} = require('../../config');

@Injectable()
export class JwtService {
    constructor(private readonly authService: AuthService) {
    }
    async createTokens(email): Promise<any> {
        let payloads = {
            email: email
        };
        let token = jwt.sign(payloads, SECRET, {expiresIn: TOKEN_LIFE});
        let refreshToken = jwt.sign(payloads, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_LIFE});
        await this.authService.addToken(email, refreshToken);
        return [token, refreshToken];
    }

    async validateHeader(request): Promise<boolean> {
        let result;
        let authHeader = request.headers.authorization;
        if(authHeader){
            let token = authHeader.split(' ')[1];
            let email;
            jwt.verify(token, SECRET, (err, decoded) => {
                if(err){
                    result = false;
                    return;
                }
                email = decoded.email;
            })
            if(email){
                let user = await this.authService.getUser(email);
                result =  !!user
            }
        }
        return result;
    }

    async validateRefreshToken(token): Promise<any> {
        let result = await this.authService.findToken(token);
        if(!result){
            return [false];
        }
        return jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err){
                return [false];
            }
            return [true, decoded]
        });
    }
}
