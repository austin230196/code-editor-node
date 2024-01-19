import { Request, Response, NextFunction } from "express";

const handleAsyncCatch = async (req: Request, res: Response, next: NextFunction) => {
    try{}catch()
}