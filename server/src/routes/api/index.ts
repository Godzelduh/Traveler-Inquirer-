import {Router } from 'express';
import {userRouter} from './user-routes.js';
import authRoutes from '../auth-Route.js'
import apiRoutes from '../api/index.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);

export default router;

