import express, {Router, Reqeust, Response} from 'express';
import {AmadeusAuthService} from '../middleware/AmedaAuth';
import {authenticateToken} from '../middleware/AmedaMiddle';
import { AmadeusConfig } from '../middleware/AmedaAuth';

export function createAmadeusRoute(config: AmadeusConfig): Router{
    const router = Router();
    const amadeusService = new AmadeusAuthService(config);

    router.post('/login', async (_req: Request, res: Response) => {
        try{
            const tokenResponse = await amadeusService.generateJWT();

            if(!tokenResponse){
                return res.status(500).json({
                    success: false,
                    error: 'Failed to generate JWT'
                });
            }
            return res.json({
                success:true,
                data: tokenResponse
            });
        } catch(error){
            console.error('Error in login route:', error);
            return res.status(500).json({
                success: false,
                error: 'internal server error'
            });
        }
    
    });
}