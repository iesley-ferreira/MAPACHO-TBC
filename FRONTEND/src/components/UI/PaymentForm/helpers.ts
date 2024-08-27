import { IProduct, TransformedProduct } from '../../../interfaces/Product';

export const transformProduct = (product: IProduct): TransformedProduct => {
  return {
    id: product.id,
    title: product.nome,
    description: product.descricaoCurta,
    picture_url: product.imagemURL,
    quantity: product.quantidade!,
    unit_price: product.preco,
    currency_id: 'BRL',
  };
};
