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

