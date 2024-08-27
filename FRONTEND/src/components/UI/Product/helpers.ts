import { IProduct, IFullProduct } from '../../../interfaces/Product';

export const convertProductIdToProduct = (
  product: IFullProduct,
  selectedVariation: number,
  variationString: string,
): IProduct => {
  return {
    id: selectedVariation || product.id,
    // idProdutoPai: product.categoria.id,
    nome: product.nome,
    // codigo: product.codigo,
    preco: product.preco,
    // tipo: product.tipo,
    // situacao: product.situacao,
    // formato: product.formato,
    // descricaoCurta: product.descricaoCurta,
    imagemURL: product.midia?.imagens?.externas[0]?.link || '',
    variacao: variationString,
  };
};
