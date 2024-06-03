import express from 'express';
import cache from '../cache';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ blingToken: cache.blingToken.get() })
});

export {
  app,
}