import { MercadoPagoConfig, Payment } from 'mercadopago';
import { env } from '../env';
import { PaymentCreateData } from 'mercadopago/dist/clients/payment/create/types';


const client = new MercadoPagoConfig({
  accessToken: env.MERCADO_PAGO_ACCESS_TOKEN,
  options: {
    timeout: 5000,
    idempotencyKey: 'abc'
  }
});

const payment = new Payment(client);

const createPayment = async (body: PaymentCreateData) => {
  // try {
  //   return payment.create(body)
  // } catch (e) {
  //   return {
  //     data: {
  //       message: 'Erro ao gerar meio de pagamento'
  //     }
  //   }
  // }

  return payment.create(body)

}

const mercadoPagoProvider = {
  createPayment,
}

export default mercadoPagoProvider;
