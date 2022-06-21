import { Controller, Get } from '@nestjs/common';
import { EmployeesService } from "../../services/employees/employees.service";

@Controller('employees')
export class EmployeesController {
    constructor(private  readonly employeeService: EmployeesService) {
    }
    @Get('getAllEmployees')
    getAllEmployees(): any {
        return this.employeeService.getAllEmployees();
    }
}
