import { IFullProduct, IProduct } from '../../../interfaces/Product';

export const convertProductIdToProduct = (
  product: IFullProduct,
  selectedVariation: number,
  variationString: string,
): IProduct => {
  return {
    id: selectedVariation || product.id,
    // idProdutoPai: productId.categoria.id,
    nome: product.nome,
    // codigo: productId.codigo,
    preco: product.preco,
    // tipo: productId.tipo,
    // situacao: productId.situacao,
    // formato: productId.formato,
    descricaoCurta: product.descricaoCurta,
    variacao: variationString,
  };
};
