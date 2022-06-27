import { Module } from '@nestjs/common';
import { EmployeesModule } from "./modules/employee/employees.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
      EmployeesModule,
      AuthModule
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
