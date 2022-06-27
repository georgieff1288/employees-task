import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from "../../services/auth/auth.service";
import { UserLoginDto } from "../../dtos/user-login.dto";
import { User } from "../../models/auth/user.entity";

@Controller('api/auth/')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    async login(@Body() user: UserLoginDto ): Promise<User> {
        let dbUser = await this.authService.login(user.email);
        return this.authService.login(user.email);
    }
}
