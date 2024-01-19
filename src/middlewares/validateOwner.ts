import type { Request, Response, NextFunction } from "express"
import Joi from "joi";

const validateOwner = async(req: Request, _: Response, next: NextFunction) => {
    try{
        //prep schema
        const schema = Joi.object({
            owner: Joi.string().alphanum().min(3).max(10).required()
        })
        await schema.validateAsync({owner: req.body.owner});
        next();
    }catch(e){next(e);}
}


export default validateOwner;