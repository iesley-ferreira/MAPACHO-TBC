import { Router } from 'express';
import paymentsController from '../controllers/payment.controller';

const paymentsRouter = Router();

paymentsRouter.route('/create_preference').post(paymentsController.getPreferenceId);

paymentsRouter.route('/process_payment').post(paymentsController.processPayment);

paymentsRouter.route('/capture_payment').post(paymentsController.capturePayment);

export default paymentsRouter;
