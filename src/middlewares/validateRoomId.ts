import type { Request, Response, NextFunction } from "express";
import Joi from "joi";


const validateRoomId = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const schema = Joi.object({
            roomId: Joi.string().alphanum().length(16).required()
        })
        await schema.validateAsync({roomId: req.method === "GET" ? req.params.roomId : req.body.roomId});
        next();
    }catch(e){next(e)}
}



export default validateRoomId;