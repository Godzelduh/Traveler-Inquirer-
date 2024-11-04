import dotenv from 'dotenv';
import path from 'path';
// import { fileURLToPath } from 'url';
import { createApp } from './App.js';
// import { inititializeDatabase } from './models/index.js';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import { Models } from './types/models.js';

dotenv.config();


async function startServer() {
   const sequelize = new Sequelize(/* your database config */);
    
    // Initialize your models here
    const models: Models = {
      sequelize,
      User: /* your User model initialization */,
      // ... other models
    }
  
    // Create Express app with models
    const app = await createApp({ models });

    // Configure CORS
    const corsOptions = {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL // Use your production frontend URL
        : ['http://localhost:5173', 'http://127.0.0.1:5173'], // Development frontend URLs
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, // Enable if you're using cookies/sessions
      maxAge: 86400 // CORS preflight cache time in seconds
    };

    // Apply CORS middleware before other routes
    app.use(cors(corsOptions));

    // Serve static files from the React app in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../../client/dist')));

      // The "catchall" handler: for any request that doesn't match the API routes
      // send back the index.html file.
      app.get('*', (_req: Request , res: Response) => {
        res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
      });
    }

    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, () => {
      console.log(`🌎 Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received. Starting graceful shutdown...');
      
      // Close server first (stop accepting new requests)
      await new Promise((resolve) => {
        server.close(resolve);
      });
      console.log('Server closed');

      // Close database connection
      await sequelize.close();
      console.log('Database connection closed');

      process.exit(0);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();