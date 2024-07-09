import prisma from '../../providers/prisma.provider';

const getProductByOrderId = async (order_id: string) => {
  return prisma.product.findMany({ where: { order_id } });
};

const productsModel = {
  getProductByOrderId,
};

export default productsModel;
