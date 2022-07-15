import { Module } from '@nestjs/common';
import { EmployeesModule } from "./modules/employee/employees.module";
import { AuthModule } from "./modules/auth/auth.module";
import {DepartmentsModule} from "./modules/department/departments.module";
import { ScheduleModule } from '@nestjs/schedule';
import {AuthService} from "./services/auth/auth.service";
import {authProviders} from "./modules/auth/auth.providers";
import {refreshTokenProviders} from "./modules/auth/refresh-token.providers";
import {TasksService} from "./services/tasks/tasks.service";



@Module({
  imports: [
      EmployeesModule,
      AuthModule,
      DepartmentsModule,
      ScheduleModule.forRoot()
  ],
  controllers: [ ],
  providers: [
      AuthService,
      ...authProviders,
      ...refreshTokenProviders,
      TasksService
  ],
})
export class AppModule {}
