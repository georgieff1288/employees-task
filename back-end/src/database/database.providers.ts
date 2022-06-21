import { Sequelize } from 'sequelize-typescript';
 import { Employee } from '../models/employee/employee.entity';

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
            sequelize.addModels([Employee]);
            await sequelize.sync();
            return sequelize;
        },
    },
];