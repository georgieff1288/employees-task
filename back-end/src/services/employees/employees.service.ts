import { Injectable, Inject } from '@nestjs/common';
import { Employee } from '../../modules/employee/employee.entity'
import { Department } from '../../modules/department/department.entity'

@Injectable()
export class EmployeesService {
    constructor(
        @Inject('EMPLOYEES_REPOSITORY')
        private employeesRepository: typeof Employee
    ) {
    }

    async getAllEmployees(): Promise<Employee[]> {
        return await this.employeesRepository.findAll<Employee>({
            include:[{
                model: Department,
                as: 'department'
            }]
        });
    }

    async addEmployee(emp): Promise<Employee> {
        return await this.employeesRepository.create(emp);
    }

    async deleteEmployee(id): Promise<number> {
        return await this.employeesRepository.destroy({
            where:{
                id: id
            }
        })
    }

    async getEmployeeById(id): Promise<Employee> {
        return  await this.employeesRepository.findOne({
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
        return await this.employeesRepository.update(employee, {where: {id: id}});
    }
}
