export interface IProduct {
  id: string;
  nome: string;
  preco: number;
  imagemURL: string;
  descricaoCurta: string;
  variacao?: string;
  quantidade?: number;
}

export interface createPreferenceData {
  items: TransformedProduct[];
}

export interface TransformedProduct {
  id: string;
  title: string;
  description: string;
  picture_url: string;
  quantity: number;
  unit_price: number;
  currency_id: 'BRL';
}

export type VariationType = {
  variationId: string;
  variationName: string;
  variationType: string;
};

export interface IFullProduct {
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

export interface IProductVariation extends IFullProduct {
  variacao: {
    nome: string;
    ordem: number;
  };
  produtoPai: {
    id: number;
    cloneInfo: boolean;
  };
}

export interface ProductQueryType {
  pagina: number;
  limite: number;
  idCategoria?: string;
  nome?: string;
}

export interface ProductResponse {
  data: IProduct[];
}
