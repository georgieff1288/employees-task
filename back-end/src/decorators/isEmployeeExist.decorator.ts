import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { EmployeesService } from "../services/employees/employees.service";

@ValidatorConstraint({ name: 'IsEmployeeExist', async: true })
@Injectable()
export class IsEmployeeExistDecorator implements ValidatorConstraintInterface {
    constructor(private employeeService: EmployeesService) {}

    async validate(value: number) {
        try {
            let count = await this.employeeService.isEmployeeExist(value);
            if(count > 0){
                return true
            }
            else{
                return false
            }
        } catch (e) {
            return false;
        }
        return true;

    }

    defaultMessage(args: ValidationArguments) {
        return `Employee doesn't exist`;
    }
}