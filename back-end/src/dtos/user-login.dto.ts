import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserLoginDto{
    @IsEmail({}, {
        message: "Enter a valid email"
    })
    @IsNotEmpty({
        message: ' Email is required',
    })
    email: string;

    @IsNotEmpty({
        message: ' Password is required',
    })
    @MinLength(6,{
        message: ' Password must be at least 6 symbols',
    })
    password: string
}