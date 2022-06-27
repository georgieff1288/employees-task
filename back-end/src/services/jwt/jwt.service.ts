import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const { SECRET } = require('../../config')

@Injectable()
export class JwtService {
    createToken(email): string {
        let payloads = {
            email: email
        };
        let options = {expiresIn: '1h'};
        let token = jwt.sign(payloads, SECRET, options);
        return token;
    }
}
