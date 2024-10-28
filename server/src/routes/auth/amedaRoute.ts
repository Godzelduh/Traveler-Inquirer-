import { Router, Request, Response } from 'express';
import { AmadeusAuthService } from '../../middleware/AmedaAuth.js';
import { AmadeusConfig } from '../../middleware/AmedaAuth.js';

export function createAmadeusRouter(config: AmadeusConfig) {
  const router = Router();
  const amadeusService = new AmadeusAuthService(config);

  router.post('/token', async (_req: Request, res: Response) => {
    try {
      const tokenResponse = await amadeusService.generateJWT();

      if (!tokenResponse) {
        return res.status(500).json({
          success: false,
          error: 'Failed to generate Amadeus token'
        });
      }

      return res.json({
        success: true,
        data: tokenResponse
      });
    } catch (error) {
      console.error('Amadeus token error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  });

  return router;
}