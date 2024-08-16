// const mercadopago = require('mercadopago');
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../../env';

const client = new MercadoPagoConfig({
  accessToken: env.MERCADO_PAGO_ACCESS_TOKEN_02,
  options: { timeout: 5000 },
});

const createPreference = async (items: any) => {
  const preferenceBody = {
    items: items,
  };

  const preference = new Preference(client);
  const response = await preference.create({
    body: preferenceBody,
  });

  return response.id;
};

const processPayment = async (formData: any) => {
  const payment = new Payment(client);
  const idempotencyKey = uuidv4();

  const response = await payment.create({
    body: formData,
    requestOptions: { idempotencyKey },
  });

  return response;
};

export default {
  createPreference,
  processPayment,
};
