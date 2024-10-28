import { Router, Request, Response } from 'express';
import { User } from '../../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface AuthConfig {
  jwtSecret: string;
}

export function createUserAuthRouter(config: AuthConfig) {
  const router = Router();

  router.post('/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        where: { username },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = jwt.sign({ userId: user.id, username }, config.jwtSecret, { 
        expiresIn: '1h' 
      });

      return res.json({ 
        success: true,
        data: { token, user: { id: user.id, username: user.username } }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
      });
    }
  });

  return router;
}