import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from "../services/jwt/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwt: JwtService) {
    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.jwt.validateHeader(request);
    }
}