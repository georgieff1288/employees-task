import { Module } from '@nestjs/common';
import { departmentsProviders } from './departments.providers';
import { DatabaseModule } from '../../database/dtabase.module';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [...departmentsProviders],
})
export class DepartmentsModule {}