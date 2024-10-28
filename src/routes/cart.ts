import express, { Request, Response } from 'express';
import { Cart } from '@/entities/Cart';
import { CartProduct } from '@/entities/CartProduct';
import { Product } from '@/entities/Product';
import asyncHandler from '@/utils/asyncHandler';
import { corsWithOptions } from '@/middlewares/corsConfig';

const cartRouter = express.Router();

cartRouter.get(
  '/',
  corsWithOptions,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Please log in' });
    }

    const response = await Cart.find({
      where: { userId },
      relations: ['cartProducts', 'cartProducts.product'],
    });

    res.json(response);
  })
);

cartRouter.post(
  '/changeProduct',
  corsWithOptions,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;
    const { productId, count } = req.body as { productId: number; count: number };

    if (!userId) {
      return res.status(401).json({ error: "Can't add product to cart without logging in." });
    }

    let cart = await Cart.findOne({
      where: { userId },
      relations: ['cartProducts'],
    });

    if (!cart) {
      cart = await Cart.create({ userId }).save();
    }

    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cartProduct = await CartProduct.findOne({
      where: { cart: { id: cart.id }, product: { id: productId } },
    });

    if (cartProduct) {
      if (count === 0) {
        await cartProduct.remove();
      } else {
        cartProduct.productCount = count;
        await cartProduct.save();
      }
    } else {
      cartProduct = await CartProduct.create({
        cart,
        product,
        productCount: count,
      }).save();
    }

    const updatedCart = await Cart.findOne({
      where: { id: cart.id },
      relations: ['cartProducts', 'cartProducts.product'],
    });

    res.json(updatedCart);
  })
);

export default cartRouter;
