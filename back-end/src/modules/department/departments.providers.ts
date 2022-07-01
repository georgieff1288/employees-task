import { Department } from './department.entity';

export const departmentsProviders = [
    {
        provide: 'DEPARTMENTS_REPOSITORY',
        useValue: Department,
    },
];