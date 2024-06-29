import { OrderInputType } from '../../types/Order.type';
import orderModel from '../models/order.model';

const addOrder = async (orderData: OrderInputType) => {
  const newOrder = await orderModel.createOrder(orderData);

  return {
    data: {
      message: 'Order created successfully',
      order: newOrder,
    },
    status: 201,
  };
};

export default {
  addOrder,
};
