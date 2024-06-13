import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cache from '../cache';
import loginRouter from './routers/login.router';
import productsRouter from './routers/products.router';
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// app.use((err: any, req: any, res: any, next: any) => {
//   if (err ) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
//   next();
// });

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
  next();
});

app.get('/', (req: Request, res: Response) => {
  return res.json({ blingToken: cache.blingToken.get() });
});
// app.get('/', (req, res) => {
//   return res.json({ blingToken: cache.blingToken.get() })
// });


// ========================= Rotas da API ================================== //
app.use('/products', productsRouter);
app.use('login', loginRouter);

export {
  app
};
