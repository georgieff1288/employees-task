import { Module } from '@nestjs/common';
import { DatabaseModule } from "../../database/dtabase.module";
import { AuthController } from "../../controllers/auth/auth.controller";
import { AuthService } from "../../services/auth/auth.service";
import { authProviders } from "./auth.providers";
import { JwtService } from "../../services/jwt/jwt.service";
import {refreshTokenProviders} from "./refresh-token.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        ...authProviders,
        JwtService,
        ...refreshTokenProviders
    ],
})
export class AuthModule {}
