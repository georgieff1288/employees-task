import {Controller, Get, Post, Delete, Put, Body, Param, UseGuards, Query} from '@nestjs/common';
import { EmployeesService } from "../../services/employees/employees.service";
import { Employee } from "../../modules/employee/employee.entity";
import { AddEmployeeDto } from "../../dtos/add-employee.dto";
import { FindOneParams } from "../../dtos/find-one-params";
import { AuthGuard } from "../../guards/auth.guard";
import {OptionsDto} from "../../dtos/options.dto";
import {DepartmentsService} from "../../services/departments/departments.service";


@Controller('api/employees')
@UseGuards(AuthGuard)
export class EmployeesController {
    constructor(private  readonly employeeService: EmployeesService, private readonly departmentService: DepartmentsService) {
    }

    @Get()
    getAllEmployees(@Query() params: OptionsDto): Promise<{}> {
        console.log(params)
        params.pageIndex = Number(params.pageIndex);
        params.pageSize = Number(params.pageSize)
        return this.employeeService.getAllEmployees(params);
    }

    @Post()
    addEmployee(@Body() employee: AddEmployeeDto): Promise<Employee> {
        return this.employeeService.addEmployee(employee);
    }

    @Get('/filters')
    async getFilters(){
        let departments = await this.departmentService.getDepartments();
        let cities = await this.employeeService.getCities();
        return {
            cities: cities,
            departments: departments
        }
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
