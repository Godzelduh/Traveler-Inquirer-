
// import { User } from '../../models/user.js';
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Models } from '../../types/models'; // You'll need to create this type

interface AuthConfig {
  jwtSecret: string;
  models: Models;
}


export function createUserAuthRouter(config: AuthConfig) {
  const router = Router();
  const { models, jwtSecret } = config;

  router.post('/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await models.User.findOne({
        where: { username },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = jwt.sign({ userId: user.id, username }, jwtSecret, { 
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

  router.post('/signup', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      // Check if user already exists
      const existingUser = await models.User.findOne({
        where: { username },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username already exists'
        });
      }

      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await models.User.create({
        username,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { userId: newUser.id, username }, 
        jwtSecret, 
        { expiresIn: '1h' }
      );

      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
          token,
          user: { id: newUser.id, username: newUser.username }
        }
      });

    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error creating user'
      });
    }
  });

  return router;
}
// import { Router, Request, Response } from 'express';
// import { User } from '../../models/user.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// interface AuthConfig {
//   jwtSecret: string;
// }

// export function createUserAuthRouter(config: AuthConfig) {
//   const router = Router();

//   router.post('/login', async (req: Request, res: Response) => {
//     try {
//       const { username, password } = req.body;

//       const user = await User.findOne({
//         where: { username },
//       });

//       if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).json({ message: 'Authentication failed' });
//       }

//       const token = jwt.sign({ userId: user.id, username }, config.jwtSecret, { 
//         expiresIn: '1h' 
//       });

//       return res.json({ 
//         success: true,
//         data: { token, user: { id: user.id, username: user.username } }
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       return res.status(500).json({ 
//         success: false, 
//         error: 'Internal server error' 
//       });
//     }
//   });

//   return router;
// }