import { Sequelize } from 'sequelize-typescript';
import { Employee } from '../models/employee/employee.entity';
import { Department } from '../models/department/department.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'employees_task',
                define: {
                    timestamps: false
                },
            });
            sequelize.addModels([Employee, Department]);

            Department.hasMany(Employee, {
                foreignKey: 'department_id',
                as: 'employees'
            });
            Employee.belongsTo(Department, {
                foreignKey: 'department_id',
                as: 'department'
            })
            await sequelize.sync();
            return sequelize;
        },
    },
];