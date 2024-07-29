import { Request, Response } from 'express';
import paymentService from '../services/payment.service';

const getPreferenceId = async (req: Request, res: Response) => {
  const { items } = req.query;
  let parsedItems: any;
  try {
    parsedItems = JSON.parse(items as string);
    const preferenceId = await paymentService.createPreference(parsedItems);

    res.status(201).json({ preferenceId });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const handlePayment = async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.processPayment(req.body);
    res.status(201).json(payment);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// const capturePayment = async (req: Request, res: Response) => {
//   try {
//     const { paymentId } = req.body;
//     console.log('Payment ID capturePayment:', paymentId);

//     res.status(201).json();
//   } catch (error: any) {
//     console.error(error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

const paymentsController = {
  getPreferenceId,
  handlePayment,
  // capturePayment,
};

export default paymentsController;
