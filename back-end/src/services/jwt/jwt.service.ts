import {Injectable} from '@nestjs/common';
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
    constructor(
        private readonly authService: AuthService
    ) {
    }
    async createTokens(id, oldToken?): Promise<any> {
        let payloads = {
            id: id
        };
        let token = jwt.sign(payloads, SECRET, {expiresIn: TOKEN_LIFE});
        let refreshToken = jwt.sign(payloads, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_LIFE});
        if(oldToken){
            await this.authService.updateToken(oldToken, refreshToken);
        }
        else{
            await this.authService.addToken(id, refreshToken);
        }
        return [token, refreshToken];
    }

    async validateHeader(request): Promise<boolean> {
        let result;
        let id;
        let authHeader = request.headers.authorization;
        if(authHeader){
            let token = authHeader.split(' ')[1];
            jwt.verify(token, SECRET, (err, decoded) => {
                if(err){
                    result = false;
                    return;
                }
                id = decoded.id;
            })
            if(id){
                let isUserExist = await this.authService.findUserById(id);
                result =  !!isUserExist;
            }
        }
        return result;
    }

    async validateRefreshToken(refreshToken): Promise<any> {
        let result = await this.authService.findToken(refreshToken);
        if(!result){
            return [false];
        }
        return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err){
                return [false];
            }
            return [true, decoded]
        });
    }
}
