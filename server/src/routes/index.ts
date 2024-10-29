import { express, Router } from 'express';
import dotenv from 'dotenv';
import { createUserAuthRouter } from './auth/userAuthRoute.js';
import { createAmadeusRouter } from './auth/amedaRoute.js';
import { createProtectedRouter } from './api/index.js';
import { inititializeDatabase, Models } from '../models/index.js';
import { authenticateUser } from '../middleware/auth.js';


dotenv.config();

async function createRouter(p0: { models: Models; }) {
  const app = express();
  app.use(express.json());

  // Initialize database
  const { models } = await inititializeDatabase();

  // Public routes - User login/registration
  app.use('/auth', createUserAuthRouter({
    jwtSecret: process.env.JWT_SECRET_KEY!
  }));

  // Public routes - Amadeus API authentication
  app.use('/auth/amadeus', createAmadeusRouter({
    clientID: process.env.AMADEUS_CLIENT_ID!,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET!,
    jwtSecret: process.env.JWT_SECRET_KEY!,
    isProduction: process.env.NODE_ENV === 'production'
  }));

  // Protected routes - requires user to be logged in
  app.use('/api', authenticateUser, createProtectedRouter({
    models,
    amadeusConfig: {
      clientID: process.env.AMADEUS_CLIENT_ID!,
      clientSecret: process.env.AMADEUS_CLIENT_SECRET!,
      isProduction: process.env.NODE_ENV === 'production'
    }
  }));

  return app;
}

export default createRouter;