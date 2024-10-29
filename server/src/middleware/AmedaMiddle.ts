import type{Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';


export interface JWTPayload{
    amadeusToken: string;
    exp: number;
    iat: number;
}


export const authenticateToken = (
    req: Request & { user?: JWTPayload },
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token is required'
      });
    }
  
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
      req.user = payload;
      next();
      return;
    } catch (error) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }
  };