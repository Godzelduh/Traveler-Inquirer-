import { Router, express } from 'express';
import dotenv from 'dotenv';
import authRoutes from './auth-Route.js'
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
import { createAmadeusRoute } from './AmadeRoute.js';

dotenv.config();

const app = express();
app.use(express.json());

const amadeusConfig = { 
    clientID: process.env.AMADEUS_CLIENT_ID || '',
    clientSecret: process.env.AMADEUS_CLIENT_SECRET || '',
    jwtSecret: process.env.JWT_SECRET || '',
    isProduction: process.env.NODE_ENV === 'production'
};

app.use('/api/amadeus', createAmadeusRoute(amadeusConfig));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);

export default router;