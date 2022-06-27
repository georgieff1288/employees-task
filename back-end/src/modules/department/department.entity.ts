import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class Department extends Model {
    @PrimaryKey
    @Column
    department_id: number;

    @Column
    department_name: string;
}