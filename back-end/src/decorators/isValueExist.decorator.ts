import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import { databaseProviders } from "../database/database.providers"

@ValidatorConstraint({ name: 'IsValueExist', async: true })
@Injectable()
export class IsValueExistDecorator implements ValidatorConstraintInterface {
    constructor() {}

    async validate(value: number, args: ValidationArguments) {
        try {
            let sql = `SELECT * FROM ${args.constraints[0]} WHERE ${args.constraints[1]} = ${value}`;
            let db;
            await databaseProviders[0].useFactory().then(res => {db = res});
            let result = await db.query(sql);
            if(result[0].length > 0){
                return true
            }
            else{
                return false
            }
        } catch (e) {
            return false;
        }
        return true;

    }

    defaultMessage(args: ValidationArguments) {
        return `Employee doesn't exist`;
    }
}

export function IsValueExist (tableName: string, columnName: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsValueExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [tableName, columnName],
            validator: IsValueExistDecorator,
        });
    };
}