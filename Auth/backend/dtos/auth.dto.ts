import { IsEmail, IsString, Length } from 'class-validator';

class SignupDTO {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    @Length(8)
    password: string;
}

class LoginDTO {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8)
    password: string;
}

export { SignupDTO, LoginDTO };
