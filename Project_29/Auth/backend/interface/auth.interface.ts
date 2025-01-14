import { UserAttributes } from "../models/user";

export interface LoginResponse{
    user:UserData;
    token:string
}

export interface UserData{
    id:number;
    name:string;
    email:string;
    isVerified:boolean;
}
