import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import { AuthService } from "../../services/auth/auth.service";
import { UserLoginDto } from "../../dtos/user-login.dto";
import { Response } from "express";
import { JwtService } from "../../services/jwt/jwt.service";

const bcrypt = require('bcrypt');
const { TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } = require('../../config');

@Controller('api/auth/')
export class AuthController {
    constructor(private readonly authService: AuthService, private  readonly jwtService: JwtService) {
    }

    // login credentials - admin@abv.bg - 123456
    @Post('login')
    async login(@Body() user: UserLoginDto, @Res() res: Response ): Promise<any> {
        let dbUser;
        await this.authService.getUser(user.email)
            .then(res => dbUser = res)
            .catch( err => {return err})
        if(dbUser == null){
            return res.status(HttpStatus.NOT_FOUND).json({
                statusCode: 401,
                message: 'Invalid credentials'
            });
        }
        if(!bcrypt.compareSync(user.password, dbUser.password)){
            return res.status(HttpStatus.NOT_FOUND).json({
                statusCode: 401,
                message: 'Invalid credentials'
            });
        }
        let tokens = this.jwtService.createTokens(dbUser.email);
        res.cookie(TOKEN_COOKIE_NAME, tokens[0]);
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens[1]);
        return res.status(HttpStatus.OK).json({
            statusCode: 200,
            message: 'Login success',
            userEmail: dbUser.email
        });
    }
}
