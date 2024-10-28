import { Router } from 'express';
import { userRouter } from './user-routes';
import { createTripRouter } from './trip-routes';
import { AmadeusService } from '../../service/amadeusService';

interface ProtectedRouterConfig {
  models: any;
  amadeusConfig: {
    clientID: string;
    clientSecret: string;
    isProduction: boolean;
  };
}

export function createProtectedRouter({ models, amadeusConfig }: ProtectedRouterConfig) {
  const router = Router();
  
  // Initialize Amadeus service for protected routes
  const amadeusService = new AmadeusService(
    amadeusConfig.clientID,
    amadeusConfig.clientSecret,
    amadeusConfig.isProduction
  );
  
  // Protected user profile routes
  router.use('/users', userRouter);
  
  // Protected trip routes that use Amadeus service
  router.use('/trips', createTripRouter({
    models,
    amadeusService
  }));
  
  return router;
}


