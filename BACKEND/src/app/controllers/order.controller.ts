import { Request, Response } from 'express';
import orderService from '../services/order.service';

const addOrder = async (req: Request, res: Response) => {
  const { userId, products, total } = req.body;

  try {
    const { data, status } = await orderService.addOrder({ userId, products, total });
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const orderController = {
  addOrder,
};

export default orderController;