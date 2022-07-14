import { Module } from '@nestjs/common';
import { EmployeesController } from '../../controllers/employees/employees.controller';
import { EmployeesService } from '../../services/employees/employees.service';
import { employeesProviders } from './employees.providers';
import { DatabaseModule } from '../../database/dtabase.module';
import { IsValueExistDecorator } from "../../decorators/isValueExist.decorator";
import { JwtService } from "../../services/jwt/jwt.service";
import { AuthService } from "../../services/auth/auth.service";
import { authProviders } from "../auth/auth.providers";
import {DepartmentsService} from "../../services/departments/departments.service";
import {departmentsProviders} from "../department/departments.providers";
import {refreshTokenProviders} from "../auth/refresh-token.providers";




@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [EmployeesController],
    providers: [
        EmployeesService,
        ...employeesProviders,
        IsValueExistDecorator,
        JwtService,
        AuthService,
        ...authProviders,
        DepartmentsService,
        ...departmentsProviders,
        ...refreshTokenProviders
    ],
})
export class EmployeesModule {}