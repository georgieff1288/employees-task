import { Sequelize } from 'sequelize-typescript';
import { Employee } from '../modules/employee/employee.entity';
import { Department } from '../modules/department/department.entity';
import { User } from "../modules/auth/user.entity";

const { DB_PORT, DB_NAME } = require('../config')

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: DB_PORT,
                username: 'root',
                password: '',
                database: DB_NAME,
                define: {
                    timestamps: false
                },
            });
            sequelize.addModels([Employee, Department, User]);

            Department.hasMany(Employee, {
                foreignKey: 'department_id',
                as: 'employees'
            });
            Employee.belongsTo(Department, {
                foreignKey: 'department_id',
                as: 'department'
            });
            await sequelize.sync();
            return sequelize;
        },
    },
];