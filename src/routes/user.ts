import { Router, Request, Response } from 'express';
import { User } from '@/entities/User'; // Adjust the import according to your structure
import asyncHandler from '@/utils/asyncHandler';
import { corsWithOptions } from '@/middlewares/corsConfig';

const router = Router();

// GET /users
router.get(
  '/',
  corsWithOptions,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Please log in' });
    }
    const users = await User.find();
    res.json(users);
  })
);

// Optionally, you might want to include a route to get a specific user by ID
router.get(
  '/:id',
  corsWithOptions,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Please log in' });
    }
    const { id } = req.params;

    const user = await User.findOne({ where: { id: parseInt(id) } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  })
);

export default router;
