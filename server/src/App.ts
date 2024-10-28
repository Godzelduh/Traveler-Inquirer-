import express from 'express';
import createRouter from '../src/routes/index.js';
import { Models } from './models/index.js';


interface AppConfig {
    models: Models;
  }


  export async function createApp({ models }: AppConfig) {
    const app = express();
  
    // Middleware
    
    app.use(express.json());
    
    // Routes
    const router = await createRouter({ models });
    app.use('/api', router);
  
    // Error handling
   app.use()

    return app;
  }