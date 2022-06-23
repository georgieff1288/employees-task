import { Module } from '@nestjs/common';
import { EmployeesController } from '../../controllers/employees/employees.controller';
import { EmployeesService } from '../../services/employees/employees.service';
import { employeesProviders } from './employees.providers';
import { DatabaseModule } from '../../database/dtabase.module';
import { IsEmployeeExistDecorator } from "../../decorators/isEmployeeExist.decorator";

@Module({
    imports: [DatabaseModule],
    controllers: [EmployeesController],
    providers: [
        EmployeesService,
        ...employeesProviders,
        IsEmployeeExistDecorator,
    ],
})
export class EmployeesModule {}