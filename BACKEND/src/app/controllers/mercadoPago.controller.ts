import { Request, Response } from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../../env';

const mockTicketURLResponse =
  'https://www.mercadopago.com.br/sandbox/payments/1318883036/ticket?caller_id=1899520162&hash=4fd63159-5404-4b85-ac0c-7cf9a30faf24';

const orderByPix = async (req: Request, res: Response) => {
  try {
    console.log('REQ BODY: ', req.body);

    const {
      transaction_amount,
      description,
      paymentMethodId,
      email,
      identificationType,
      number,
    } = req.body;

    if (
      !transaction_amount ||
      !description ||
      !paymentMethodId ||
      !email ||
      !identificationType ||
      !number
    ) {
      return res.status(400).json({
        data: { message: 'Missing required fields' },
        status: 400,
      });
    }

    const client = new MercadoPagoConfig({
      accessToken: env.MERCADO_PAGO_ACCESS_TOKEN_02,
      options: { timeout: 5000 },
    });

    const payment = new Payment(client);

    const body = {
      transaction_amount,
      description,
      payment_method_id: paymentMethodId,
      payer: {
        email,
        identification: {
          type: identificationType,
          number,
        },
      },
    };

    const idempotencyKey = uuidv4();
    const requestOptions = {
      idempotencyKey,
    };

    const result = await payment.create({ body, requestOptions });
    const ticketUrl = result.point_of_interaction?.transaction_data?.ticket_url;

    return res.status(200).json({
      data: { ticketUrl: ticketUrl },
      status: 200,
    });
    // res.send('TUDO OK');
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('ERROR: ', errorMessage);

    return res.status(500).json({
      data: { message: 'Internal server error', error: (error as Error).message },
      status: 500,
    });
  }
};

const mercadoPagoController = { orderByPix };

export default mercadoPagoController;
