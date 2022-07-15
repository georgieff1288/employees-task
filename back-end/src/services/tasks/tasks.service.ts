import { Injectable } from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class TasksService {
    constructor(private authService: AuthService) {
    }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    @Cron(CronExpression.EVERY_DAY_AT_1PM)
    async deleteExpiredTokens(){
        await this.authService.deleteExpiredTokens();
    }
}
