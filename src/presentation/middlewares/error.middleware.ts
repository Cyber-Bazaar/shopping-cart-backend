import { NextFunction, Request, Response } from "express";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    const message = err.message ? err.message : "Internal server error";
    res.status(statusCode).json({message});
}