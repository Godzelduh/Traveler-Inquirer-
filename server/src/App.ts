// App.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from './routes/api/user-routes.js';
import { createUserAuthRouter } from './routes/auth/userAuthRoute.js';
import { Models } from './types/models.js';


interface AppConfig {
  models: Models; 
}

export async function createApp({ models }: AppConfig) {
  const app = express();
  dotenv.config();
  // Configure CORS - This must come BEFORE other middleware and routes
  const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400
  };

  app.use(cors(corsOptions));

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Auth configuration
  const authConfig = {
    jwtSecret: process.env.JWT_SECRET_KEY || 'APP_SECRET_KEY',
    models
  };

  // Pass models to routes that need them
  app.use('/auth', createUserAuthRouter(authConfig));
  app.use('/api/users', userRouter);


  // Test route to verify CORS
  app.get('/test', (_req, res) => {
    res.json({ message: 'CORS is working' });
  });

  return app;
}