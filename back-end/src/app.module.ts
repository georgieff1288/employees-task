import { Module } from '@nestjs/common';
import { EmployeesModule } from "./models/employee/employees.module";
import { AuthModule } from "./models/auth/auth.module";

@Module({
  imports: [
      EmployeesModule,
      AuthModule
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
