import { Module } from '@nestjs/common';
import { EmployeesModule } from "./modules/employee/employees.module";
import { AuthModule } from "./modules/auth/auth.module";
import {DepartmentsModule} from "./modules/department/departments.module";

@Module({
  imports: [
      EmployeesModule,
      AuthModule,
      DepartmentsModule
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
