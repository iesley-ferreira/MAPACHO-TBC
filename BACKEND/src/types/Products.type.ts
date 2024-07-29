export interface ProductType  {
  id: string
  order_id: string
  nome: string
  codigo: string
  preco: number
  tipo: string
  situacao: string
  formato: string
  descricaoCurta: string
  imagemURL: string
  variacao: string
  quantidade: number
}

export interface ProductInputType {
  nome: string;
  codigo: string;
  preco: number;
  tipo: string;
  situacao: string;
  formato: string;
  descricaoCurta: string;
  imagemURL: string;
  variacao: string;
  quantidade: number;
}





// ==================== Interfaces from Bling API ==================== //
interface Categoria {
  id: number;
}

interface Estoque {
  minimo: number;
  maximo: number;
  crossdocking: number;
  localizacao: string;
}

interface Dimensoes {
  largura: number;
  altura: number;
  profundidade: number;
  unidadeMedida: number;
}

interface Tributacao {
  origem: number;
  nFCI: string;
  ncm: string;
  cest: string;
  codigoListaServicos: string;
  spedTipoItem: string;
  codigoItem: string;
  percentualTributos: number;
  valorBaseStRetencao: number;
  valorStRetencao: number;
  valorICMSSubstituto: number;
  codigoExcecaoTipi: string;
  classeEnquadramentoIpi: string;
  valorIpiFixo: number;
  codigoSeloIpi: string;
  valorPisFixo: number;
  valorCofinsFixo: number;
  codigoANP: string;
  descricaoANP: string;
  percentualGLP: number;
  percentualGasNacional: number;
  percentualGasImportado: number;
  valorPartida: number;
  tipoArmamento: number;
  descricaoCompletaArmamento: string;
  dadosAdicionais: string;
  grupoProduto: {
    id: number;
  };
}

interface Video {
  url: string;
}

interface Imagens {
  externas: {
    link: string;
  }[];
  internas: {
    link: string;
  }[];
}

interface Midia {
  video: Video;
  imagens: Imagens;
}

interface LinhaProduto {
  id: number;
}

interface Estrutura {
  tipoEstoque: string;
  lancamentoEstoque: string;
  componentes: any[];
}

interface CamposCustomizados {
  idCampoCustomizado: number;
  idVinculo: number;
  valor: string;
  item: string;
}

interface Variacao {
  id: number;
  nome: string;
  codigo: string;
  preco: number;
  tipo: string;
  situacao: string;
  formato: string;
  descricaoCurta: string;
  imagemURL: string;
  dataValidade: string;
  unidade: string;
  pesoLiquido: number;
  pesoBruto: number;
  volumes: number;
  itensPorCaixa: number;
  gtin: string;
  gtinEmbalagem: string;
  tipoProducao: string;
  condicao: number;
  freteGratis: boolean;
  marca: string;
  descricaoComplementar: string;
  linkExterno: string;
  observacoes: string;
  descricaoEmbalagemDiscreta: string;
  categoria: Categoria;
  estoque: Estoque;
  actionEstoque: string;
  dimensoes: Dimensoes;
  tributacao: Tributacao;
  midia: Midia;
  linhaProduto: LinhaProduto;
  estrutura: Estrutura;
  camposCustomizados: CamposCustomizados[];
  variacoes: any[];
  variacao: {
    nome: string;
    ordem: number;
    produtoPai: {
      id: number;
      cloneInfo: boolean;
    };
  };
}

export interface ProductComopletedType {
  id: number;
  nome: string;
  codigo: string;
  preco: number;
  tipo: string;
  situacao: string;
  formato: string;
  descricaoCurta: string;
  dataValidade: string;
  unidade: string;
  pesoLiquido: number;
  pesoBruto: number;
  volumes: number;
  itensPorCaixa: number;
  gtin: string;
  gtinEmbalagem: string;
  tipoProducao: string;
  condicao: number;
  freteGratis: boolean;
  marca: string;
  descricaoComplementar: string;
  linkExterno: string;
  observacoes: string;
  descricaoEmbalagemDiscreta: string;
  categoria: Categoria;
  estoque: Estoque;
  actionEstoque: string;
  dimensoes: Dimensoes;
  tributacao: Tributacao;
  midia: Midia;
  linhaProduto: LinhaProduto;
  estrutura: Estrutura;
  camposCustomizados: CamposCustomizados[];
  variacoes: Variacao[];
}
