import { IProduct } from './Product';

export interface IOrder {
  id: number;
  data: string;
  total: number;
  status: string;
  products: IProduct[] | [];
}

export interface IUser {
  id: number;
  token: string;
  nome: string;
  email: string;
  img?: string;
  telefone?: string;
  endereco?: IUserAddress;
  pedidos?: IOrder[];
  dataCadastro?: string;
}

export interface IUserAddress {
  cep: string;
  rua: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
}

export interface IUserUpdate {
  id: string;
  nome?: string;
  email?: string;
  telefone?: string;
  cep?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserCreateParams {
  nome: string;
  email: string;
  telefone: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  password: string;
}
