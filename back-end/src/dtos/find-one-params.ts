import { IsNumberString } from 'class-validator';
import { IsEmployeeExist } from "../decorators/isEmployeeExist.factory";

export class FindOneParams {
    @IsEmployeeExist()
    @IsNumberString()
    id: number;
}
