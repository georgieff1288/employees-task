import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from "../../services/employee/employee.service";

@Controller('employees')
export class EmployeeController {
    constructor(private  readonly employeeService: EmployeeService) {
    }
    @Get('getAllEmployees')
    getAllEmployees(): string {
        return this.employeeService.getAllEmployees();
    }
}
