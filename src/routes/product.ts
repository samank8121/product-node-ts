import { Router, Request, Response } from 'express';
import { Product } from '@/entities/Product'; // Adjust the import according to your structure
import asyncHandler from '@/utils/asyncHandler';
import { corsWithOptions } from '@/middlewares/corsConfig';

const router = Router();

// GET /products
router.get(
  '/:slug',
  corsWithOptions,
  asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    console.log('product:', req.params);
    const products = slug
      ? await Product.findBy({ slug: slug as string }) // Type assertion
      : await Product.find();

    res.json(products);
  })
);

// POST /products
router.post(
  '/',
  corsWithOptions,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Please log in' });
    }
    const {
      caption,
      price,
      slug,
      weight,
      rate,
      description,
    } = req.body;

    const newProduct = Product.create({
      caption,
      price,
      slug,
      weight,
      rate,
      description,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct); // 201 Created
  })
);

export default router;
