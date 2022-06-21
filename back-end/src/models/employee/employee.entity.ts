import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Employee extends Model {
    @Column
    employee_name: string;

    @Column
    department_id: number;

    @Column
    phone: string;

    @Column
    city: string;

    @Column
    street: string;
}