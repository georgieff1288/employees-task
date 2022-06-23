import { registerDecorator, ValidationOptions} from "class-validator";
import { IsEmployeeExistDecorator } from "./isEmployeeExist.decorator";

export function IsEmployeeExist(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsEmployeeExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsEmployeeExistDecorator,
        });
    };
}