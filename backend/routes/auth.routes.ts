import { Router, Request, Response } from 'express';
import Route from '../interface/router.interface';
import AuthController from '../controller/auth.controller';
import validationMiddleware from '../middleware/validation.middleware';
import {SignupDTO} from '../dtos/auth.dto';
import {LoginDTO} from '../dtos/auth.dto';

class AuthRoutes implements Route {
    public router = Router();
    public path = '/auth';

    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/signup`,
            validationMiddleware(SignupDTO, 'body'),
            this.authController.signup
        );

        this.router.post(   
            `${this.path}/login`,
            validationMiddleware(LoginDTO, 'body'),
            this.authController.login
        );
    }

}

export default AuthRoutes;
