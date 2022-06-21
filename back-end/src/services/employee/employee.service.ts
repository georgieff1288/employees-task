import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
    getAllEmployees(): string {
        return 'Hello from employees service'
    }
}
