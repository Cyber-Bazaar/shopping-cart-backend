import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../interface/i.httpException";

export const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    const message = err.message ? err.message : "Internal server error";
    res.status(statusCode).json({message});
}