import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Ai dentro' })
});

export {
  app,
}