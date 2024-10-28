import dotenv from 'dotenv';
import {createApp} from './App.js';
import {inititializeDatabase} from './models/index.js';


dotenv.config();

async function startServer() {
  try {
    // Validate required environment variables
    const requiredEnvVars = [
      'DB_HOST',
      'DB_USER',
      'DB_PASSWORD',
      'DB_NAME',
      'JWT_SECRET_KEY',
      'AMADEUS_CLIENT_ID',
      'AMADEUS_CLIENT_SECRET'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }

    // Initialize database and get models
    const { sequelize, models } = await inititializeDatabase();

    // Create Express app with models
    const app = await createApp({ models });

    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
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

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();