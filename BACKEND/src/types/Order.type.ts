import { ProductInputType, ProductType } from "./Products.type";
import { UserType } from "./User.type";

export interface OrderType {
  id: string;
  user_id: string;
  payment_id: number;
  total: number;
  status: 'processing' | 'approved' | 'pending';
  created_at: Date;
  updated_at: Date;
  products: ProductType;
}

export interface OrderInputType {
  userId: string;
  products: ProductInputType[];
  total: number;
  paymentId: number;
  status?: 'processing' | 'approved' | 'pending'
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

