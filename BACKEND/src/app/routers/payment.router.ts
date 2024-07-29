import { Router } from 'express';
import paymentsController from '../controllers/payment.controller';

const paymentsRouter = Router();

paymentsRouter.route('/preference').post(paymentsController.getPreferenceId);

paymentsRouter.route('/payment').post(paymentsController.handlePayment);

// paymentsRouter.route('/capture').post(paymentsController.capturePayment);

export default paymentsRouter;
