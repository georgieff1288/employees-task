import { Module } from '@nestjs/common';
import { EmployeesModule } from "./models/employee/employees.module";

@Module({
  imports: [
      EmployeesModule,
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
