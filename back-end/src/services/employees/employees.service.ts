import { Injectable, Inject } from '@nestjs/common';
import { Employee } from '../../models/employee/employee.entity'
import { Department } from '../../models/department/department.entity'

@Injectable()
export class EmployeesService {
    constructor(
        @Inject('EMPLOYEES_REPOSITORY')
        private employeesRepository: typeof Employee
    ) {
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeesRepository.findAll<Employee>({
            include:[{
                model: Department,
                as: 'department'
            }]
        });
    }

    async addEmployee(emp): Promise<Employee> {
        return this.employeesRepository.create(emp);
    }

    async deleteEmployee(id): Promise<number> {
        return this.employeesRepository.destroy({
            where:{
                id: id
            }
        })
    }

    async getEmployeeById(id): Promise<Employee> {
        return  this.employeesRepository.findOne({
            where:{
                id: id
            },
            include:[{
                model: Department,
                as: 'department'
            }]
        })
    }

    async  editEmployee(employee, id): Promise<any> {
        return this.employeesRepository.update(employee, {where: {id: id}});
    }
}
