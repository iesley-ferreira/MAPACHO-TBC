export interface IOrder {
  id: number;
  data: string;
  total: number;
  status: string;
  products: { id: number; quantidade: number }[] | [];
}

export interface IUser {
  id: string;
  token: string;
  nome: string;
  email: string;
  img: string;
  telefone: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  pedidos?: IOrder[];
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
