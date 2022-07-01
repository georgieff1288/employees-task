import {Inject, Injectable} from '@nestjs/common';
import {Department} from "../../modules/department/department.entity";

@Injectable()
export class DepartmentsService {
    constructor(
        @Inject('DEPARTMENTS_REPOSITORY')
        private departmentsRepository: typeof Department
    ) {
    }

    async getDepartments(): Promise<any> {
        console.log('here')
        return await this.departmentsRepository.findAll();
    }
}
