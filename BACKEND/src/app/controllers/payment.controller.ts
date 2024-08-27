import { Request, Response } from 'express';
import paymentService from '../services/payment.service';

const getPreferenceId = async (req: Request, res: Response) => {
  const { items, orderInfo } = req.body;
  console.log('CONTROLLER getPreferenceId items:', items);
  // console.log('CONTROLLER getPreferenceId orderInfo:', orderInfo);

  try {
    const { status, preferenceId, message, insufficientStockItems } =
      await paymentService.createPreference(items);

    if (status === 200) {
      console.log('CONTROLLER RETORNOU getPreferenceId preferenceId:', preferenceId);

      res.status(201).json(preferenceId);
    }

    if (status === 400) {
      console.log(
        'CONTROLLER getPreferenceId insufficientStockItems:',
        insufficientStockItems,
      );
      res.status(200).json({ message, insufficientStockItems });
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const processPayment = async (req: Request, res: Response) => {
  try {
    console.log('CONTROLLER processPayment BODY:', req.body);

    const response = await paymentService.processPayment(req.body);

    const paymentData = {
      payment_id: response.id,
      payment_status: response.status,
      payment_status_detail: response.status_detail,
      payment_method: response.payment_method_id,
      payment_type: response.payment_type_id,
      ticket_url: response.point_of_interaction?.transaction_data?.ticket_url ?? '',

      transaction_amount: response.transaction_amount,
      installments: response.installments,
      installment_amount: response.transaction_details?.installment_amount ?? '',
      total_paid_amount: response.transaction_details?.total_paid_amount ?? '',
      date_created: response.date_created,
      date_approved: response.date_approved,
      date_last_updated: response.date_last_updated,
      date_of_expiration: response.date_of_expiration,
    };

    console.log('CONTROLLER processPayment:', response);

    res.status(201).json(paymentData);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const capturePayment = async (req: Request, res: Response) => {
  try {
    const { paymentId, idempotencyKey } = req.body;
    const response = await paymentService.capturePayment(paymentId, idempotencyKey);

    res.status(201).json(response.status);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const cancelPayment = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;
    const response = await paymentService.cancelPayment(paymentId);

    res.status(201).json(response.status);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const paymentsController = {
  getPreferenceId,
  processPayment,
  capturePayment,
  cancelPayment,
};

export default paymentsController;
