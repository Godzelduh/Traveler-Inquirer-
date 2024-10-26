import { express } from 'express';
import dotenv from 'dotenv';
import { createAmadeusRoute } from './amedaRoute.js';
import { createTripRouter } from './api/trip-routes.js';
import { inititializeDatabase } from '../models/index.js';



async function startServer() {
    try {
      // Initialize database and get models
      const { sequelize, models } = await inititializeDatabase();
      
      const app = express();
      app.use(express.json());
        
      
      dotenv.config();
      // Configure routers with models
      app.use('/api/auth', createAmadeusRoute({
        clientID: process.env.AMADEUS_CLIENT_ID!,
        clientSecret: process.env.AMADEUS_CLIENT_SECRET!,
        jwtSecret: process.env.JWT_SECRET!,
        isProduction: process.env.NODE_ENV === 'production',
      }));
  
      app.use('/api/trips', createTripRouter(models));
  
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }
  
  startServer();