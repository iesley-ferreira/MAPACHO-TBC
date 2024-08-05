import { IProduct, IProductId } from '../../../interfaces/Product';

export const convertProductIdToProduct = (productId: IProductId): IProduct => {
  return {
    id: productId.id,
    // idProdutoPai: productId.categoria.id,
    nome: productId.nome,
    // codigo: productId.codigo,
    preco: productId.preco,
    // tipo: productId.tipo,
    // situacao: productId.situacao,
    // formato: productId.formato,
    // descricaoCurta: productId.descricaoCurta,
    imagemURL: productId.midia?.imagens?.externas[0]?.link || '',
  };
};
