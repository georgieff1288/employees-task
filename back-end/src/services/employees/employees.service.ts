import { Injectable, Inject } from '@nestjs/common';
import { Employee } from '../../models/employee/employee.entity'

@Injectable()
export class EmployeesService {
    constructor(
        @Inject('EMPLOYEES_REPOSITORY')
        private employeesRepository: typeof Employee
    ) {
    }
    async getAllEmployees(): Promise<Employee[]> {
        return this.employeesRepository.findAll<Employee>();
    }
}
