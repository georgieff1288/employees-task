import {Controller, Get, Post, Req, Delete, Param} from '@nestjs/common';
import { EmployeesService } from "../../services/employees/employees.service";
import { Employee } from "../../models/employee/employee.entity";
import { Request } from 'express';

@Controller('api/employees')
export class EmployeesController {
    constructor(private  readonly employeeService: EmployeesService) {
    }
    @Get('get-all-employees')
    getAllEmployees(): Promise<Employee[]> {
        return this.employeeService.getAllEmployees();
    }

    @Post('add-employee')
    addEmployee(@Req() request: Request): Promise<Employee>{
        let employee = {
            employee_name: request.body.employee_name,
            department_id: request.body.department.department_id,
            phone: request.body.phone,
            city: request.body.city,
            street: request.body.street
        }
        return this.employeeService.addEmployee(employee);
    }

    @Delete('delete-employee/:id')
    deleteEmployee(@Req() request: Request){
        return this.employeeService.deleteEmployee(request.params.id);
    }
}
