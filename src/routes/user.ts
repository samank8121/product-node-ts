import { Router, Request, Response } from 'express';
import { User } from '@/entities/User';
import asyncHandler from '@/utils/asyncHandler';
import { corsWithOptions } from '@/middlewares/corsConfig';

const router = Router();

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
