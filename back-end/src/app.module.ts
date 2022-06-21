import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employees/employees.controller';
import { EmployeeService } from './services/employee/employee.service';

@Module({
  imports: [],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class AppModule {}
