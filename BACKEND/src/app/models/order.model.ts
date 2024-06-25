// models/order.model.ts

import prisma from '../../providers/prisma.provider';
import { OrderInputType } from '../../types/Order.type';

export const createOrder = async ({ userId, products, total }: OrderInputType) => {
  return await prisma.order.create({
    data: {
      user_id: userId,
      total,
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
