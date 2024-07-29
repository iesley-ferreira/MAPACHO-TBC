import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import authRouter from './routers/auth.router';
import categoriesRouter from './routers/categories.router';
import mercadoPagoRouter from './routers/mercadoPago.router';
import orderRouter from './routers/order.router';
import passwordRouter from './routers/password.router';
import productsRouter from './routers/products.router';
import shippingRouter from './routers/shipping.router';
import userRouter from './routers/user.router';
import paymentRouter from './routers/payment.router';

const app = express();
app.use(cors());
app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {

  if (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
  next();
});

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: "🔥 Mapacho Server Runner! 🔥" });
});

// ========================= Rotas da API ================================== //
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/shipping', shippingRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/orders', orderRouter);
app.use('/reset-password', passwordRouter);
app.use('/mercado-pago', mercadoPagoRouter);
// ========================= Middleware de erro ============================= //

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export { app };
