import { DataSource } from 'typeorm';
import { Product } from '@/entities/product';
import { User } from '@/entities/user';
import { Cart } from '@/entities/cart';
import dotenv from 'dotenv';
import { CartProduct } from '@/entities/cartProduct';

dotenv.config();

export default new DataSource({
  entities: [Product, User, Cart, CartProduct],
  type: 'postgres',
  url: process.env.CONNECTION_STRING,
  synchronize: true,
});
