import { Module } from '@nestjs/common';
import { departmentsProviders } from './departments.providers';
import { DatabaseModule } from '../../database/dtabase.module';
import {DepartmentsService} from "../../services/departments/departments.service";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        DepartmentsService,
        ...departmentsProviders,
    ],
})
export class DepartmentsModule {}