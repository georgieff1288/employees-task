import { Body, Controller, Get, HttpStatus, Post, Res, Req } from '@nestjs/common';
import { AuthService } from "../../services/auth/auth.service";
import { UserLoginDto } from "../../dtos/user-login.dto";
import { Response, Request } from "express";
import { JwtService } from "../../services/jwt/jwt.service";
import * as jwt from 'jsonwebtoken';

const bcrypt = require('bcrypt');
const {
    TOKEN_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
    SECRET,
    TOKEN_LIFE, } = require('../../config');

@Controller('api/auth/')
export class AuthController {
    constructor(private readonly authService: AuthService, private  readonly jwtService: JwtService) {
    }

    // login credentials - admin@abv.bg - 123456
    @Post('login')
    async login(@Body() user: UserLoginDto, @Res() res: Response): Promise<any> {
        let dbUser;
        await this.authService.getUser(user.email)
            .then(res => dbUser = res)
            .catch( err => {return err})
        if(dbUser == null){
            return res.status(HttpStatus.NOT_FOUND).json({
                statusCode: 404,
                message: 'Invalid credentials'
            });
        }
        if(!bcrypt.compareSync(user.password, dbUser.password)){
            return res.status(HttpStatus.NOT_FOUND).json({
                statusCode: 404,
                message: 'Invalid credentials'
            });
        }
        let tokens = await this.jwtService.createTokens(dbUser.email);
        res.cookie(TOKEN_COOKIE_NAME, tokens[0]);
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens[1]);
        return res.status(HttpStatus.OK).json({
            statusCode: 200,
            message: 'Login success',
            userEmail: dbUser.email
        });
    }

    @Get('token')
    async getNewToken(@Req() req: Request, @Res() res: Response): Promise<any> {
        let refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
        if(!refreshToken){
            return res.status(HttpStatus.FORBIDDEN).json({
                statusCode: 403,
                message: 'Forbidden resource'
            });
        }
        let decoded =  await this.jwtService.validateRefreshToken(refreshToken);
        if(!decoded[0]){
            return res.status(HttpStatus.FORBIDDEN).json({
                statusCode: 403,
                message: 'Forbidden resource'
            });
        }
        let payloads = {email: decoded[1].email};
        let newToken = jwt.sign(payloads, SECRET, {expiresIn: TOKEN_LIFE});
        res.cookie(TOKEN_COOKIE_NAME, newToken);
        return res.status(HttpStatus.OK).json({
            statusCode: 200,
            message: 'Created new access token',
            token: newToken
        });
    }
}
