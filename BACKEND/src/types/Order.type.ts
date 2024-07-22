export interface OrderInputType {
  userId: string;
  products: ProductInputType[];
  total: number;
}

export interface IOrder {
  id: string;
  total: number;
  status: string;
  products: IProduct[] | [];
  created_at: Date;
}

export interface IProduct {
  id: string;
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
