import {Controller, Get} from '@nestjs/common';
import {DepartmentsService} from "../../services/departments/departments.service";
import {Department} from "../../modules/department/department.entity";

@Controller('api/departments/')
export class DepartmentsController {
    constructor(private  readonly departmentService: DepartmentsService) {
    }
    @Get()
    getDepartments(): Promise<Department> {
       return this.departmentService.getDepartments();
    }
}
