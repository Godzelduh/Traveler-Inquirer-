import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { createTripRouter } from './trip-routes.js';
import { AmadeusService } from '../../service/amadeusService.js';

interface ProtectedRouterConfig {
  models: any;
  amadeusConfig: {
    clientID: string;
    clientSecret: string;
    isProduction: boolean;
  };
}

export function createProtectedRouter(config: ProtectedRouterConfig) {
  const router = Router();
  
  // Initialize Amadeus service for protected routes
  const amadeusService = new AmadeusService(
    config.amadeusConfig.clientID,
    config.amadeusConfig.clientSecret,
    config.amadeusConfig.isProduction
  );
  
  // Protected user profile routes
  router.use('/users', userRouter);
  
  // Protected trip routes that use Amadeus service
  router.use('/trips', createTripRouter({
    models: config.models,
    amadeusService
  }));
  
  return router;
}


