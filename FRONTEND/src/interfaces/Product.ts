export interface IProduct {
  id: number;
  // idProdutoPai: number;
  nome: string;
  codigo: string;
  preco: number;
  tipo: string;
  situacao: string;
  formato: string;
  descricaoCurta: string;
  imagemURL: string;
  variacao?: string;
  quantidade?: number;
}

export interface IProductId {
  id: number;
  categoria: {
    id: number;
  };
  codigo: string;
  condicao: number;
  descricaoCurta: string;
  descricaoEmbalagemDiscreta: string;
  dimensoes: {
    largura: number;
    altura: number;
    profundidade: number;
    unidadeMedida: number;
  };
  formato: string;
  marca: string;
  nome: string;
  observacoes: string;
  pesoBruto: number;
  pesoLiquido: number;
  preco: number;
  situacao: string;
  tipo: string;
  unidade: string;
  midia: {
    imagens: {
      externas: [{ link: string }];
      internas: [{ link: string }];
    };
    video: { url: string };
  };
  variacoes: Array<IProductVariation>;
}

export interface IProductVariation extends IProductId {
  variacao: {
    nome: string;
    ordem: number;
  };
  produtoPai: {
    id: number;
    cloneInfo: boolean;
  };
}

export interface ProductResponse {
  data: IProduct[];
}
