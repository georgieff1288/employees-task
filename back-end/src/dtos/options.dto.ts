import {IsNumberString, IsString} from "class-validator";


export class OptionsDto{

    @IsString()
    city: string;

    @IsString()
    departmentId: number;

    @IsNumberString()
    pageIndex: number;

    @IsNumberString()
    pageSize: number;
}