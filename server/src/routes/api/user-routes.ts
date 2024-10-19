import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';

const router = express.Router();

//finds all users
router.get('/', async (_req: Request, res: Response) => {
    try{
        const users = await User.findAll({
            attributes: {exclude: ['password']}
        });
        res.json(users);
    } catch(err:any){
        res.status(500).json({message: err.message});
          
    }
});

//finds user by id
router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    try{
        const user = await User.findByPk(id, {
            attributes: {exclude: ['password']}
        });
        if(user){
            res.json(user);
        }else{
            res.status(404).json({message: 'User not found'});
        }
    }catch (err:any){
        res.status(500).json({message: err.message})
    }
});

//create a new user
router.post('/', async (req: Request, res: Response) => {
    const {username, password} = req.body;
    try{
        const newUser = await User.create({username, password});
        res.status(201).json(newUser);
    }catch(err:any){
        res.status(400).json({message: err.message});
    }

});

//update user by id
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
      const user = await User.findByPk(id);
      if (user) {
        user.username = username;
        user.password = password;
        await user.save();
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

//delete user by id
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.json({ message: 'User deleted' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export { router as userRouter };