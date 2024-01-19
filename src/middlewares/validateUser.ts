import type { Request, Response, NextFunction } from "express";
import Joi from "joi";


const validateUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {user} = req.body;
        const schema = Joi.object({
            user: Joi.string().required().alphanum().min(3).max(10)
        })
        await schema.validateAsync({user});
        next();
    }catch(e){next(e)}
}



export default validateUser;