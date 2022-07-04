import { Injectable, Inject } from '@nestjs/common';
import { Employee } from '../../modules/employee/employee.entity'
import { Department } from '../../modules/department/department.entity'
import { Sequelize } from 'sequelize-typescript';
import {Op} from "sequelize";

@Injectable()
export class EmployeesService {
    constructor(
        @Inject('EMPLOYEES_REPOSITORY')
        private employeesRepository: typeof Employee
    ) {
    }

    async getAllEmployees(params): Promise<Employee[]> {
        let filters = {
            city: {[Op.ne]: null},
            department_id: {[Op.ne]: null}
        };
        if(params.city && params.city != 'null'){
            filters.city = params.city;
        }
        if(params.departmentId && params.departmentId != 'null'){
            filters.department_id = params.departmentId;
        }
        return await this.employeesRepository.findAll<Employee>({
            where: filters,
            include:[{
                model: Department,
                as: 'department'
            }],
            order: [['employee_name', 'ASC']]
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

    async editEmployee(employee, id): Promise<any> {
        return await this.employeesRepository.update(employee, {where: {id: id}});
    }

    async getCities(): Promise<Employee[]>{
        return await this.employeesRepository.findAll({
            attributes:[ [Sequelize.fn('DISTINCT', Sequelize.col('city')) ,'name']],
            order: [['city', 'ASC']]
        });
    }
}
