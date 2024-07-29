// models/order.model.ts

import prisma from '../../providers/prisma.provider';
import { OrderInputType, OrderType, OrderUpdateInputType } from '../../types/Order.type';

const createOrder = async ({ userId, products, total, paymentId }: OrderInputType) => {
  return await prisma.order.create({
    data: {
      user_id: userId,
      total,
      payment_id: paymentId,
      status: 'processing',
      products: {
        create: products.map((product) => ({
          nome: product.nome,
          codigo: product.codigo,
          preco: product.preco,
          tipo: product.tipo,
          situacao: product.situacao,
          formato: product.formato,
          descricaoCurta: product.descricaoCurta,
          imagemURL: product.imagemURL,
          variacao: product.variacao,
          quantidade: product.quantidade,
        })),
      },
    },
  });
};

const updateOrder = async ({ idOrder, status }: OrderUpdateInputType) => prisma.order.update({
  where: {
    id: idOrder,
  },
  data: {
    status,
  }
})

const orderModel = {
  createOrder,
  updateOrder,
}

export default orderModel;
