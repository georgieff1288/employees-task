import { Employee } from './employee.entity';

export const employeesProviders = [
    {
        provide: 'EMPLOYEES_REPOSITORY',
        useValue: Employee,
    },
];