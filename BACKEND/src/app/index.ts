import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cache from '../cache';
import authRouter from './routers/auth.router';
import categoriesRouter from './routers/categories.router';
import productsRouter from './routers/products.router';
import shippingRouter from './routers/shipping.router';
import userRouter from './routers/user.router';

const app = express();
app.use(cors());
app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
  next();
});

app.get('/', (req: Request, res: Response) => {
  return res.json({ blingToken: cache.blingToken.get() });
});

// ========================= Rotas da API ================================== //
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/shipping', shippingRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

export { app };
