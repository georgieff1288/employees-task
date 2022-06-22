import {Controller, Get, Post, Req, Delete, Put, Body, Param} from '@nestjs/common';
import { EmployeesService } from "../../services/employees/employees.service";
import { Employee } from "../../models/employee/employee.entity";
import { Request } from 'express';
import { AddEmployeeDto } from "../../dtos/add-employee.dto";
import { FindOneParams } from "../../dtos/find-one-params";

@Controller('api/employees')
export class EmployeesController {
    constructor(private  readonly employeeService: EmployeesService) {
    }
    @Get('get-all-employees')
    getAllEmployees(): Promise<Employee[]> {
        return this.employeeService.getAllEmployees();
    }

    @Post('add-employee')
    addEmployee(@Body() employee: AddEmployeeDto): Promise<Employee> {
        return this.employeeService.addEmployee(employee);
    }

    @Delete('delete-employee/:id')
    deleteEmployee(@Param() params: FindOneParams): Promise<number> {
        return this.employeeService.deleteEmployee(params.id);
    }

    @Get('employee/:id')
    getEmployeeById(@Param() params: FindOneParams): Promise<Employee> {
        return this.employeeService.getEmployeeById(params.id);
    }

    @Put('edit-employee')
    editEmployee(@Body() addEmployee: AddEmployeeDto): Promise<Employee> {
        return this.employeeService.editEmployee(addEmployee);
    }
}
