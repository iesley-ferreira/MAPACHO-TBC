import { Request, Response } from "express";
import { PaymentGenerateType } from "../../types/Payment.type";
import paymentService from "../services/payement.service";
import { OrderInputType } from "../../types/Order.type";

const createPayment = async (req: Request, res: Response) => {
  const body: PaymentGenerateType = req.body;

  const { data, status } = await paymentService.createPayment(body)

  return res.status(status).json(data);
}

const paymentController = {
  createPayment,
}

export default paymentController;
