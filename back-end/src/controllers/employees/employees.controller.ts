import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { EmployeesService } from "../../services/employees/employees.service";
import { Employee } from "../../modules/employee/employee.entity";
import { AddEmployeeDto } from "../../dtos/add-employee.dto";
import { FindOneParams } from "../../dtos/find-one-params";

@Controller('api/employees/')
export class EmployeesController {
    constructor(private  readonly employeeService: EmployeesService) {
    }

    @Get()
    getAllEmployees(): Promise<Employee[]> {
        return this.employeeService.getAllEmployees();
    }

    @Post()
    addEmployee(@Body() employee: AddEmployeeDto): Promise<Employee> {
        return this.employeeService.addEmployee(employee);
    }

    @Delete(':id')
    deleteEmployee(@Param() params: FindOneParams): Promise<number> {
        return this.employeeService.deleteEmployee(params.id);
    }

    @Get(':id')
    getEmployeeById(@Param() params: FindOneParams): Promise<Employee> {
        return this.employeeService.getEmployeeById(params.id);
    }

    @Put(':id')
    editEmployee(@Body() addEmployee: AddEmployeeDto, @Param() params: FindOneParams): Promise<Employee> {
        return this.employeeService.editEmployee(addEmployee, params.id);
    }
}
