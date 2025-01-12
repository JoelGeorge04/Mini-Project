import { Response, Request, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { skip } from 'node:test';
const validationMiddleware = (type: any, value: | 'body' | 'query' | 'params' = 'body') => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const errors = await validate(plainToInstance(type, req[value]), { skipMissingProperties: false });
        console.log(errors);
        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(', ');
            res.status(400).json( message );
        }else {
            next();
        }
        
    }
}
    export default validationMiddleware