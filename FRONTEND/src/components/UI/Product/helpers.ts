import { IProduct, IProductId } from '../../../interfaces/Product';

export const convertProductIdToProduct = (productId: IProductId): IProduct => {
  return {
    id: productId.id,
<<<<<<< HEAD
    // idProdutoPai: productId.categoria.id,
    nome: productId.nome,
    // codigo: productId.codigo,
    preco: productId.preco,
    // tipo: productId.tipo,
    // situacao: productId.situacao,
    // formato: productId.formato,
    // descricaoCurta: productId.descricaoCurta,
=======
    idProdutoPai: productId.categoria.id,
    nome: productId.nome,
    codigo: productId.codigo,
    preco: productId.preco,
    tipo: productId.tipo,
    situacao: productId.situacao,
    formato: productId.formato,
    descricaoCurta: productId.descricaoCurta,
>>>>>>> 130354f5b3a0e5fb676c88177bca140bc0dd8377
    imagemURL: productId.midia?.imagens?.externas[0]?.link || '',
  };
};
