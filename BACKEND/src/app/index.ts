import express from 'express';
import cache from '../cache';
import productsRouter from './routers/products.router';
import loginRouter from './routers/login.router';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ blingToken: cache.blingToken.get() })
});


// ========================= Rotas da API ================================== //
app.use('/products', productsRouter);
app.use('login', loginRouter);

export {
  app,
}