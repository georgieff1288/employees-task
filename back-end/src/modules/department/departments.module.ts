import { Module } from '@nestjs/common';
import { departmentsProviders } from './departments.providers';
import { DatabaseModule } from '../../database/dtabase.module';
import {DepartmentsService} from "../../services/departments/departments.service";
import {DepartmentsController} from "../../controllers/departments/departments.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [DepartmentsController],
    providers: [
        DepartmentsService,
        ...departmentsProviders,
    ],
})
export class DepartmentsModule {}