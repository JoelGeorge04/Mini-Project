import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service'
import {SignupDTO} from '../dtos/auth.dto';
import {LoginDTO} from '../dtos/auth.dto';



class AuthController{

    public authService = new AuthService()


    public signup = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const userData:SignupDTO = req.body 
            const data = await this.authService.Signup(userData)
            res.status(200).json({message:"User created successfully",data})
        }catch(err:any){ 
            res.status(err.status ?? 500).json({message:err.message ?? "Something went wrong"})
        }
    };
    
    
    public login = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const userData:LoginDTO = req.body 
            const data = await this.authService.login(userData)
            res.status(200).json({message:"User Logged In successfully",data})
        }catch(err:any){ 
            res.status(err.status ?? 500).json({message:err.message ?? "Something went wrong"})
        }
    }


}

export default AuthController