import { Request, Response } from "express";
import mercadoPagoProvider from "../../providers/mercadopago.provider";
import { PaymentGenerateType } from "../../types/Payment.type";

const createPayment = async (req: Request, res: Response) => {
  const {
    payMethod,
    description,
    price,
    payer
  }: PaymentGenerateType = req.body;


  const response = await mercadoPagoProvider.createPayment({ body: {
    transaction_amount: price,
    description,
    payment_method_id: payMethod,
    payer: {
      email: payer?.paymentEmail,
      first_name: payer?.paymentName,
      address: payer?.address,
    }
  }});

  console.log(response);


  return res.status(201).json({ data: response });
}

const paymentController = {
  createPayment,
}

export default paymentController;
