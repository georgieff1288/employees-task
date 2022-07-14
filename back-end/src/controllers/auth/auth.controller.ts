import { Body, Controller, Get, HttpStatus, Post, Res, Req } from '@nestjs/common';
import { AuthService } from "../../services/auth/auth.service";
import { UserLoginDto } from "../../dtos/user-login.dto";
import { Response, Request } from "express";
import { JwtService } from "../../services/jwt/jwt.service";

const bcrypt = require('bcrypt');
const {
    TOKEN_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME
} = require('../../config');

@Controller('api/auth/')
export class AuthController {
    constructor(private readonly authService: AuthService, private  readonly jwtService: JwtService) {
    }

    // login credentials - admin@abv.bg - 123456
    @Post('login')
    async login(@Body() user: UserLoginDto, @Res() res: Response): Promise<any> {
        let dbUser;
        await this.authService.findUserByEmail(user.email)
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
        let tokens = await this.jwtService.createTokens(dbUser.id);
        res.cookie(TOKEN_COOKIE_NAME, tokens[0]);
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens[1]);
        return res.status(HttpStatus.OK).json({
            statusCode: 200,
            message: 'Login success',
            userEmail: dbUser.email
        });
    }

    @Post('logout')
    logout(@Body() refreshToken: any): Promise<any> {
        return this.authService.deleteToken(refreshToken.value);
    }

    @Get('token')
    async getNewToken(@Req() req: Request, @Res() res: Response): Promise<any> {
        let refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
        if(!refreshToken){
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Bad request'
            });
        }
        let decoded =  await this.jwtService.validateRefreshToken(refreshToken);
        if(!decoded[0]){
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Bad request'
            });
        }
        let tokens = await this.jwtService.createTokens(decoded[1].id, refreshToken);
        res.cookie(TOKEN_COOKIE_NAME, tokens[0]);
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens[1]);
        return res.status(HttpStatus.OK).json({
            statusCode: 200,
            message: 'Created new access token'
        });
    }
}
