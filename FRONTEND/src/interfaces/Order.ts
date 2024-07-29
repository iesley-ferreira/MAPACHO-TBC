export interface OrderInputType {
  userId: string;
  products: ProductInputType[];
  total: number;
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

export type OrderStatusType =
  | 'placed'
  | 'processing'
  | 'preparing'
  | 'shipped'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded';
