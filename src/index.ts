import express from 'express';
import typeOrmConfig from '@/type-orm.config';
import { auth } from '@/middlewares/auth';
import { cartRoutes, productRoutes, userRoutes, authRoute } from './routes';

const app = express();
const port = 5001;

app.use(express.json());

app.use((req, res, next) => {
  const token = req.headers.authorization ? auth(req.headers.authorization) : null;
  req.userId = token ? token.userId : undefined;
  next();
});

app.use('/api/carts', cartRoutes);
app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoute);

const boot = async () => {
  try {
    await typeOrmConfig.initialize();
    app.listen(port, () => {
      console.log('Server running at http://localhost:5001');
    });
  } catch (err) {
    console.error(err);
  }
};

boot();
