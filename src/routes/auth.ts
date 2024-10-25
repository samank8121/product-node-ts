import { Router, Request, Response } from 'express';
import { User } from '@/entities/User';
import * as jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import asyncHandler from '@/utils/asyncHandler';
import { corsWithOptions } from '@/middlewares/corsConfig';

const router = Router();

// POST /auth/login
router.post(
  '/login',
  corsWithOptions,
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.TOKEN_SECRET_KEY as jwt.Secret
    );

    res.json({
      token,
      user,
    });
  })
);

// POST /auth/register
router.post(
  '/register',
  corsWithOptions,
  asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    // Check for duplicate user
    const duplicateUser = await User.findOne({
      where: [{ username }, { email }],
    });
    if (duplicateUser) {
      return res.status(409).json({ error: 'Duplicate user' });
    }

    const hashedPassword = await argon2.hash(password);
    let user;
    let token;

    try {
      await User.getRepository().manager.transaction(async (transactionalEntityManager) => {
        const result = await transactionalEntityManager
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            username,
            password: hashedPassword,
            email,
          })
          .returning('*')
          .execute();

        user = result.raw[0];
        token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET_KEY as jwt.Secret);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Registration failed' });
    }

    res.status(201).json({
      user,
      token,
    });
  })
);

export default router;
