import type{Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload{
    username: string;
}

export const authenticateUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];

        const secretKey = process.env.JWT_SECRET_KEY || '';

        jwt.verify(token, secretKey, (err, user)=> {
            if(err){
                return res.sendStatus(403); // Forbidden
            }

            req.user = user as JwtPayload;
            next();
        })
    } else {
        res.sendStatus(401); // Unauthorized
    }
}