import {IsNotEmpty, Min} from 'class-validator';

export class AddEmployeeDto{
    @IsNotEmpty({
        message: ' Name is required',
    })
    employee_name: string;

    @IsNotEmpty({
        message: ' Department is required',
    })
    @Min(1,{
        message: ' Department is required',
    })
    department_id: number

    @IsNotEmpty({
        message: ' Phone is required',
    })
    phone: string;

    @IsNotEmpty({
        message: ' City is required',
    })
    city: string;

    @IsNotEmpty({
        message: ' Street is required',
    })
    street: string;
}