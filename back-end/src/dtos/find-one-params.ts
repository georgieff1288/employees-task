import { IsNumberString } from 'class-validator';
import { IsValueExist } from "../decorators/isValueExist.decorator";

export class FindOneParams {
    @IsValueExist('employees', 'id')
    @IsNumberString()
    id: number;
}
