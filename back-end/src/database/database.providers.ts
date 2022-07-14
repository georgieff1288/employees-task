import { Sequelize } from 'sequelize-typescript';
import { Employee } from '../modules/employee/employee.entity';
import { Department } from '../modules/department/department.entity';
import { User } from "../modules/auth/user.entity";
import {Refresh_Token} from "../modules/auth/refresh-token.entity";

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
            sequelize.addModels([Employee, Department, User, Refresh_Token]);

            Department.hasMany(Employee, {
                foreignKey: 'department_id',
                as: 'employees'
            });
            Employee.belongsTo(Department, {
                foreignKey: 'department_id',
                as: 'department'
            });

            User.hasMany(Refresh_Token, {
                foreignKey: 'id',
                as: 'refreshToken'
            });
            Refresh_Token.belongsTo(User, {
                foreignKey: 'user_id',
                as: 'user'
            });

            await sequelize.sync();
            return sequelize;
        },
    },
];