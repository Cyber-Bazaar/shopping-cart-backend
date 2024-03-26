import jwt from "jsonwebtoken";

export class ExpressJWT extends Request {
  tokenPayload?: jwt.JwtPayload;
  }
