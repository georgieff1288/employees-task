import { Department } from './department.entity';

export const departmentsProviders = [
    {
        provide: 'DEPARTMENT_REPOSITORY',
        useValue: Department,
    },
];