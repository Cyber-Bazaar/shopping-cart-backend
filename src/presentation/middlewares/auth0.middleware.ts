import * as dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import {  Request as ExpressRequest, Response, NextFunction } from "express";

dotenv.config();

interface Request extends ExpressRequest {
  tokenPayload?: jwt.JwtPayload;
}

export const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

export const decodeToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>
    const decoded = jwt.decode(token);
    if (typeof decoded === 'object' && decoded !== null) {
      req.tokenPayload = decoded;
    }
  }
  next(); 
};
