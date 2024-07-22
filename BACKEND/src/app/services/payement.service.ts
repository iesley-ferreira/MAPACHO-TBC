import mercadoPagoProvider from "../../providers/mercadopago.provider";
import { OrderInputType } from "../../types/Order.type";
import { PaymentGenerateType } from "../../types/Payment.type";
import { ReturnServiceType } from "../../types/ReturnService.type";
import orderModel from "../models/order.model";

const createPayment = async (data: PaymentGenerateType): Promise<ReturnServiceType> => {

  try {
    const paymentData = await mercadoPagoProvider.createPayment({ body: {
      transaction_amount: data.price,
      description: data.description,
      payment_method_id: data.payMethod,
      payer: {
        email: data.payer?.paymentEmail,
        first_name: data.payer?.paymentName,
        address: data.payer?.address,
      }
    }});

    return {
      data: {
        ...paymentData
      },
      status: 201
    }
  } catch (e) {
    console.log(e);

    return {
      data: {
        error: e
      },
      status: 500
    }

  }

  // if (!paymentData.id || !data) {
  //   return {
  //     data: {
  //       message: 'Erro ao processar pagamento',
  //     },
  //     status: 400,
  //   }
  // }


  // await orderModel.createOrder({
  //   paymentId: paymentData.id,
  //   products: order.products,
  //   total: order.total,
  //   userId: order.userId,
  //   status: order.status
  // })

}

const paymentService = {
  createPayment,
}

export default paymentService;
