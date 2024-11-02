import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from './AmedaMiddle';

interface JwtPayload {
    username: string;
    amadeusToken: string;
    exp: number;
    iat: number;
}

export const authenticateUser = (
    req: Request & { user?: JWTPayload },
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY || '';

        jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null, user: any) => {
            if(err) {
                return res.sendStatus(403);
            }

            req.user = user as JwtPayload;

            next();
            return
        });
    } else {
        res.sendStatus(401);
    }
}
