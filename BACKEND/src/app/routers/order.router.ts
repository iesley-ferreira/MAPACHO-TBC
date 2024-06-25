import { Router } from 'express';
import orderController from '../controllers/order.controller';
import orderMiddlewares from '../middlewares/order.middleware';

const orderRouter = Router();

orderRouter.route('/').post(orderMiddlewares.validateOrder, orderController.addOrder);

export default orderRouter;
