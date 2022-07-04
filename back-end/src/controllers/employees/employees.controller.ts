import {Controller, Get, Post, Delete, Put, Body, Param, UseGuards, Query} from '@nestjs/common';
import { EmployeesService } from "../../services/employees/employees.service";
import { Employee } from "../../modules/employee/employee.entity";
import { AddEmployeeDto } from "../../dtos/add-employee.dto";
import { FindOneParams } from "../../dtos/find-one-params";
import { AuthGuard } from "../../guards/auth.guard";
import {FiltersDto} from "../../dtos/filters.dto";


@Controller('api/employees')
@UseGuards(AuthGuard)
export class EmployeesController {
    constructor(private  readonly employeeService: EmployeesService) {
    }

    @Get()
    getAllEmployees(@Query() params: FiltersDto): Promise<Employee[]> {
        return this.employeeService.getAllEmployees(params);
    }

    @Post()
    addEmployee(@Body() employee: AddEmployeeDto): Promise<Employee> {
        return this.employeeService.addEmployee(employee);
    }

    @Get('/cities')
    getCities(){
        return this.employeeService.getCities();
    }

    @Delete('/:id')
    deleteEmployee(@Param() params: FindOneParams): Promise<number> {
        return this.employeeService.deleteEmployee(params.id);
    }

    @Get('/:id')
    getEmployeeById(@Param() params: FindOneParams): Promise<Employee> {
        return this.employeeService.getEmployeeById(params.id);
    }

    @Put('/:id')
    editEmployee(@Body() addEmployee: AddEmployeeDto, @Param() params: FindOneParams): Promise<Employee> {
        return this.employeeService.editEmployee(addEmployee, params.id);
    }
}
