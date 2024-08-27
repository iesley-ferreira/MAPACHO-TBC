import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import bling_request from '../../api/bling.request';
import cache from '../../cache';
import { env } from '../../env';

const accessToken = env.MERCADO_PAGO_ACCESS_TOKEN_02;

const client = new MercadoPagoConfig({
  accessToken,
  options: { timeout: 5000 },
});

interface Product {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
}

const createPreference = async (items: Product[]) => {
  // receber o id

  const bling_token = cache.blingToken.get();

  const productIds = items.map((item: Product) => item.id);
  console.log('PRODUCT IDS:', productIds);

  const { status, stockData } = await bling_request.checkProductInStock(
    bling_token,
    productIds,
  );

  console.log('PRODUCTS IN STOCK STATUS:', status);
  console.log('PRODUCTS IN STOCK DATA:', stockData);

  const insufficientStockItems = items.filter((item: Product) => {
    const productInStock = stockData.find(
      (product: any) => product.produto.id === item.id,
    );
    return productInStock && productInStock.saldoFisicoTotal < item.quantity;
  });

  console.log('INSUFFICIENT STOCK ITEMS SERVICE:', insufficientStockItems);

  if (insufficientStockItems.length > 0) {
    return {
      status: 400,
      message: 'Alguns produtos não possuem estoque suficiente',
      insufficientStockItems: insufficientStockItems.map((item: Product) => ({
        id: item.id,
        availableQuantity: stockData.find(
          (product: any) => product.produto.id === item.id,
        ).saldoFisicoTotal,
      })),
    };
  }

  const preferenceBody = {
    items,
  };

  const preference = new Preference(client);
  const response = await preference.create({
    body: preferenceBody,
  });

  // criar uma order no banco de dados vinculado ao id do usuário e adicionando o preferenceId
  // gerar a idempotencyKey aqui e vincular a ordem

  return {
    status: 200,
    preferenceId: response.id,
  };
};

const processPayment = async (formData: any) => {
  const payment = new Payment(client);
  const idempotencyKey = uuidv4();

  const response = await payment.create({
    body: formData,
    requestOptions: { idempotencyKey },
  });

  // atualizar cpf do usuário no banco de dados
  // adicionar campo de cpf e cnpj no banco de dados
  //type = response.card?.cardholder?.identification.type;
  //number = response.card?.cardholder?.identification.number;
  // atualizar ordem no banco de dados com os dados de response

  return response;
};

const capturePayment = async (id: string, idempotencyKey: string) => {
  const payment = new Payment(client);
  const response = await payment.capture({
    id,
    requestOptions: {
      idempotencyKey,
    },
  });

  if (response.status === 'approved') {
    // atualizar ordem no banco de dados com os dados de response
  }

  return response;
};

const cancelPayment = async (id: string) => {
  const payment = new Payment(client);
  // pesquisa no banco de dados a ordem pelo id
  const response = await payment.cancel({
    id,
  });

  if (response.status === 'cancelled') {
    // atualizar ordem no banco de dados com os dados de response
  }

  return response;
};

export default {
  createPreference,
  processPayment,
  capturePayment,
  cancelPayment,
};
