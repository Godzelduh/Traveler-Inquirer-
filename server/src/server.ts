import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createApp } from './App.js';
import { inititializeDatabase } from './models/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  try {
    // Validate required environment variables
    const requiredEnvVars = [
      'DATABASE_URL',
      'DB_USER',
      'DB_PASSWORD',
      'DB_NAME',
      'JWT_SECRET_KEY',
      'AMADEUS_CLIENT_ID',
      'AMADEUS_CLIENT_SECRET',
      'AMADEUS_API_URL',
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

    // Serve static files from the React app in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../../client/dist')));

      // The "catchall" handler: for any request that doesn't match the API routes
      // send back the index.html file.
      app.get('*', (req, res) => {
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