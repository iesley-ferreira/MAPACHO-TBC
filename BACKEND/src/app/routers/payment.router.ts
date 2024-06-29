import { Router } from 'express';
import paymentController from '../controllers/payment.controller';
import paymentMiddleware from '../middlewares/payment.middleware';

const paymentRouter = Router();

paymentRouter.route('/generate')
.post(
  paymentMiddleware.verificationGeneratePayment,
  paymentController.createPayment,
);

paymentRouter.route('/confirm')
.post()

export default paymentRouter;
